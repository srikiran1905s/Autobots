const express = require('express');
const Groq = require('groq-sdk');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const ChatImage = require('../models/ChatImage');
const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'vehicle-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/image\/(jpeg|jpg|png)/)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG and PNG images are allowed'), false);
    }
  }
});

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// System prompt for automotive mechanic assistant
const SYSTEM_PROMPT = `You are an expert automotive mechanic assistant for AutoBots, a comprehensive vehicle diagnostics and repair platform. Your role is to provide:

1. **Step-by-step repair guidance** - Break down complex repairs into clear, manageable steps
2. **Diagnostic troubleshooting** - Help identify issues based on symptoms and OBD codes
3. **Safety-first approach** - Always prioritize safety warnings and proper procedures
4. **Tool recommendations** - Suggest necessary tools and parts for repairs
5. **Cost estimates** - Provide ballpark estimates when asked
6. **Preventive maintenance** - Advise on maintenance schedules and best practices

Guidelines:
- Be concise but thorough
- Use simple, non-technical language when possible
- Always ask clarifying questions if the issue is unclear
- Warn about tasks that require professional expertise
- Reference specific vehicle information when provided (make, model, year)
- For OBD codes, explain the meaning, common causes, and troubleshooting steps
- Be friendly, patient, and encouraging

Remember: You're helping car owners understand and maintain their vehicles safely and effectively.`;

// Vision system prompt for image analysis
const VISION_SYSTEM_PROMPT = `You are an expert automotive mechanic and diagnostician analyzing vehicle images. Your expertise includes:

1. **Engine Component Recognition** - Identify parts, wear patterns, leaks, damage
2. **Dashboard/Warning Light Analysis** - Interpret warning lights, error codes on displays
3. **OBD Screen Reading** - Read and explain OBD-II scanner displays and codes
4. **Visual Damage Assessment** - Evaluate body damage, collision impacts, rust, corrosion
5. **Maintenance Issues** - Spot fluid leaks, worn belts, damaged hoses, battery corrosion
6. **Part Identification** - Help identify specific parts and components

When analyzing images:
- Describe what you see in the image clearly
- Identify any visible issues or concerns
- Explain the severity (minor, moderate, critical)
- Provide recommended actions or repairs
- Suggest safety precautions if needed
- Be specific about parts and locations
- If it's an OBD code display, explain the codes shown
- For dashboard warning lights, explain what each light means

Be thorough, accurate, and prioritize safety. If the image quality is poor or unclear, mention that and ask for a clearer photo if needed.`;

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        error: 'Messages array is required'
      });
    }

    // Build context-aware system prompt
    let contextPrompt = SYSTEM_PROMPT;
    
    if (context) {
      contextPrompt += `\n\nCurrent Context:\n`;
      
      if (context.vehicle) {
        contextPrompt += `- Vehicle: ${context.vehicle.year} ${context.vehicle.make} ${context.vehicle.model}\n`;
        if (context.vehicle.engine) {
          contextPrompt += `- Engine: ${context.vehicle.engine}\n`;
        }
        if (context.vehicle.type) {
          contextPrompt += `- Type: ${context.vehicle.type}\n`;
        }
      }
      
      if (context.obdCode) {
        contextPrompt += `- OBD Code: ${context.obdCode.code}\n`;
        contextPrompt += `- Meaning: ${context.obdCode.meaning}\n`;
        if (context.obdCode.possible_causes) {
          contextPrompt += `- Possible Causes: ${context.obdCode.possible_causes.join(', ')}\n`;
        }
      }
    }

    // Prepare messages for Groq
    const groqMessages = [
      {
        role: 'system',
        content: contextPrompt
      },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: groqMessages,
      model: 'llama-3.3-70b-versatile', // Latest fast and capable model
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from AI');
    }

    res.json({
      success: true,
      message: assistantMessage,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process chat request'
    });
  }
});

// Streaming chat endpoint (for future enhancement)
router.post('/chat/stream', async (req, res) => {
  try {
    const { messages, context } = req.body;

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let contextPrompt = SYSTEM_PROMPT;
    
    if (context) {
      contextPrompt += `\n\nCurrent Context:\n`;
      if (context.vehicle) {
        contextPrompt += `- Vehicle: ${context.vehicle.year} ${context.vehicle.make} ${context.vehicle.model}\n`;
      }
      if (context.obdCode) {
        contextPrompt += `- OBD Code: ${context.obdCode.code} - ${context.obdCode.meaning}\n`;
      }
    }

    const groqMessages = [
      { role: 'system', content: contextPrompt },
      ...messages.map(msg => ({ role: msg.role, content: msg.content }))
    ];

    const stream = await groq.chat.completions.create({
      messages: groqMessages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      stream: true
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('Streaming chat error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

// Vision endpoint for image analysis
router.post('/vision', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file uploaded'
      });
    }

    const { prompt, messages, context } = req.body;
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${base64Image}`;

    console.log('Processing image:', req.file.filename);
    console.log('User prompt:', prompt);

    // Build context-aware vision prompt
    let contextPrompt = VISION_SYSTEM_PROMPT;
    
    if (context) {
      const parsedContext = typeof context === 'string' ? JSON.parse(context) : context;
      contextPrompt += `\n\nVehicle Context:\n`;
      
      if (parsedContext.vehicle) {
        contextPrompt += `- Vehicle: ${parsedContext.vehicle.year} ${parsedContext.vehicle.make} ${parsedContext.vehicle.model}\n`;
        if (parsedContext.vehicle.engine) {
          contextPrompt += `- Engine: ${parsedContext.vehicle.engine}\n`;
        }
      }
      
      if (parsedContext.obdCode) {
        contextPrompt += `- OBD Code: ${parsedContext.obdCode.code} - ${parsedContext.obdCode.meaning}\n`;
      }
    }

    // Prepare messages with image
    const visionMessages = [
      {
        role: 'system',
        content: contextPrompt
      }
    ];

    // Add previous chat history if available
    if (messages) {
      const parsedMessages = typeof messages === 'string' ? JSON.parse(messages) : messages;
      if (Array.isArray(parsedMessages)) {
        visionMessages.push(...parsedMessages.slice(-5).map(msg => ({ // Last 5 messages for context
          role: msg.role,
          content: msg.content
        })));
      }
    }

    // Add current user message with image
    visionMessages.push({
      role: 'user',
      content: [
        {
          type: 'text',
          text: prompt || 'Please analyze this automotive image and provide a detailed diagnosis.'
        },
        {
          type: 'image_url',
          image_url: {
            url: imageUrl
          }
        }
      ]
    });

    console.log('Sending to Groq Vision API...');

    // Call Groq Vision API
    const completion = await groq.chat.completions.create({
      messages: visionMessages,
      model: 'llama-3.2-90b-vision-preview', // Groq's vision model
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from AI vision model');
    }

    console.log('Vision analysis complete');

    // Save image metadata to MongoDB (optional, won't fail if MongoDB is down)
    try {
      const parsedContext = context ? (typeof context === 'string' ? JSON.parse(context) : context) : null;
      
      const chatImage = new ChatImage({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        base64Data: base64Image.substring(0, 100) + '...', // Store truncated for reference
        prompt: prompt,
        aiResponse: assistantMessage,
        context: parsedContext,
        metadata: {
          uploadedAt: new Date(),
          ipAddress: req.ip,
          userAgent: req.get('user-agent')
        },
        tags: [] // Could be extracted from AI response or user input
      });

      await chatImage.save();
      console.log('Image metadata saved to MongoDB');
    } catch (dbError) {
      console.error('Failed to save image metadata to MongoDB:', dbError.message);
      // Continue anyway - don't fail the request if DB save fails
    }

    // Return response with image URL for frontend display
    res.json({
      success: true,
      message: assistantMessage,
      imageUrl: imageUrl,
      filename: req.file.filename,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Vision analysis error:', error);
    
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process image'
    });
  }
});

module.exports = router;
