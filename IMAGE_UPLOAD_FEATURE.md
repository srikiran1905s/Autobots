# 📷 Image Upload & Vision Analysis Feature

## Overview
AutoBots chatbot now supports image upload and recognition using Grok AI's vision API. Users can upload vehicle photos for AI-powered visual diagnostics.

## Features

### ✨ Capabilities
- **Image Upload**: Attach JPG/PNG images (max 5MB) via chat interface
- **Vision Analysis**: Grok AI analyzes automotive images with expert diagnostics
- **Supported Image Types**:
  - Engine photos (identify parts, leaks, damage)
  - Dashboard warning lights
  - OBD-II scanner screens
  - Vehicle damage assessment
  - Maintenance issues (belts, hoses, fluids)

### 🎨 User Interface
- **Image button** next to chat input (📷 icon)
- **Image preview** before sending
- **Upload progress bar** during processing
- **Inline image display** in chat messages
- **Remove button** to cancel upload

### 🔧 Technical Implementation

#### Frontend (`FloatingChatbot.tsx`)
```typescript
- Image file validation (JPG/PNG, max 5MB)
- File preview with FileReader API
- FormData upload to vision endpoint
- Progress tracking (10% → 30% → 80% → 100%)
- Inline image display in chat history
```

#### Backend (`/api/chatbot/vision`)
```javascript
- Multer middleware for file uploads
- Base64 encoding for Grok Vision API
- Context-aware vision analysis
- MongoDB metadata storage
- Graceful error handling
```

#### MongoDB Schema (`ChatImage`)
```javascript
{
  filename, originalName, mimetype, size,
  prompt, aiResponse, context,
  metadata: { uploadedAt, ipAddress, userAgent },
  tags, analysis: { severity, recommendations }
}
```

## API Endpoints

### POST `/api/chatbot/vision`
Upload and analyze vehicle images

**Request:**
```
Content-Type: multipart/form-data
- image: File (JPG/PNG, max 5MB)
- prompt: string (optional)
- messages: JSON (chat history)
- context: JSON (vehicle/OBD context)
```

**Response:**
```json
{
  "success": true,
  "message": "AI analysis text...",
  "imageUrl": "data:image/jpeg;base64,...",
  "filename": "vehicle-1234567890.jpg",
  "usage": { "tokens": 150 }
}
```

## Environment Variables

Add to `.env`:
```
GROQ_API_KEY=your_groq_api_key_here
```

## Usage Example

1. **Click image button** (📷) in chatbot
2. **Select image** from file picker
3. **Preview appears** with filename and size
4. **Add optional text** prompt
5. **Click Send** - upload progress shows
6. **AI analyzes** image with automotive expertise
7. **Response appears** below uploaded image

## File Structure

```
server/
  ├── routes/
  │   └── chatbot.js          # Vision endpoint
  ├── models/
  │   └── ChatImage.js        # MongoDB schema
  └── uploads/                # Uploaded images storage

src/
  └── components/
      └── FloatingChatbot.tsx # Image upload UI
```

## Vision Model

- **Model**: `llama-3.2-90b-vision-preview` (Groq)
- **System Prompt**: Automotive expert diagnostician
- **Context**: Vehicle info, OBD codes, chat history
- **Max Tokens**: 1024

## Error Handling

- ✅ File type validation (JPG/PNG only)
- ✅ File size limit (5MB max)
- ✅ Upload progress feedback
- ✅ MongoDB fallback (continues if DB fails)
- ✅ File cleanup on errors
- ✅ User-friendly error messages

## Future Enhancements

- [ ] Multiple image upload
- [ ] Image annotation tools
- [ ] Compare before/after images
- [ ] Image history gallery
- [ ] Export diagnostic reports with images
- [ ] OCR for license plates/VINs
- [ ] Image compression/optimization

## Testing

```bash
# Start servers
cd server && node index.js
cd .. && npm run dev

# Open chatbot
# Click image button
# Upload test image
# Verify AI analysis
```

## Dependencies

**Backend:**
- `multer` - File upload middleware
- `groq-sdk` - Grok AI vision API
- `mongoose` - MongoDB ODM

**Frontend:**
- `lucide-react` - Icons (ImagePlus, XCircle)
- `framer-motion` - Animations

---

**Status**: ✅ Fully Implemented
**Last Updated**: 2025-01-24
