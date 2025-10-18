const express = require('express');
const Groq = require('groq-sdk');
const router = express.Router();

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
      model: 'llama-3.1-70b-versatile', // Fast and capable model
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
      model: 'llama-3.1-70b-versatile',
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

module.exports = router;
