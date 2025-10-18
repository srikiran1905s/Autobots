# OBD RAG (Retrieval Augmented Generation) System

## Overview
The AutoBots OBD Scanner now uses a RAG system powered by MongoDB to retrieve accurate, manufacturer-specific OBD code information.

## 📊 Database Structure

### Collections
- **users** - User authentication data
- **obdcodes** - OBD diagnostic trouble codes with detailed information

### OBD Code Schema
```javascript
{
  code: String (unique, uppercase) // e.g., "P0171"
  make: String // "Generic", "Toyota", "Ford", etc.
  meaning: String // Description of the code
  possible_causes: [String] // Array of possible causes
  troubleshooting_steps: [String] // Step-by-step troubleshooting
  createdAt: Date // Auto-generated timestamp
}
```

## 📁 Data Files

### Location: `server/data/`

1. **generic_codes.json** - Universal OBD-II codes (3 codes)
   - P0171: System Too Lean (Bank 1)
   - P0300: Random/Multiple Cylinder Misfire Detected
   - P0420: Catalyst System Efficiency Below Threshold (Bank 1)

2. **toyota_codes.json** - Toyota-specific codes (2 codes)
   - P1135: Air/Fuel Sensor Heater Circuit Malfunction
   - P1605: Knock Control CPU Malfunction

3. **ford_codes.json** - Ford-specific codes (2 codes)
   - P1000: OBD-II Monitor Testing Not Complete
   - P1131: Lack of HO2S11 Switch, Sensor Indicates Lean (Bank 1)

## 🔌 API Endpoints

### Base URL: `http://localhost:5000`

#### 1. Get Specific OBD Code
```
GET /api/obd/:code
```
**Example:**
```bash
curl http://localhost:5000/api/obd/P0171
```
**Response:**
```json
{
  "success": true,
  "data": {
    "code": "P0171",
    "make": "Generic",
    "meaning": "System Too Lean (Bank 1)",
    "possible_causes": [...],
    "troubleshooting_steps": [...]
  }
}
```

#### 2. Get All OBD Codes
```
GET /api/obd
GET /api/obd?make=Toyota (filter by manufacturer)
```
**Example:**
```bash
curl http://localhost:5000/api/obd
curl http://localhost:5000/api/obd?make=Toyota
```

#### 3. Search OBD Codes
```
GET /api/obd/search/:query
```
**Example:**
```bash
curl http://localhost:5000/api/obd/search/lean
```

## 💾 Data Import

### Import Script: `server/importOBDCodes.js`

**Run the import:**
```bash
cd server
node importOBDCodes.js
```

**What it does:**
1. Connects to MongoDB
2. Clears existing OBD codes
3. Reads JSON files from `server/data/`
4. Imports all codes into the database
5. Displays import summary

**Output:**
```
✅ Connected to MongoDB
🗑️  Cleared existing OBD codes
✅ Imported 7 OBD codes successfully!

📊 Import Summary:
   Generic codes: 3
   Toyota codes: 2
   Ford codes: 2
   Total: 7
```

## 🎯 Frontend Integration

### OBD Scanner Page: `src/pages/OBDScanner.tsx`

#### Features:
1. **Manual Code Lookup**
   - User enters OBD code
   - Fetches data from MongoDB API
   - Displays detailed diagnostic information

2. **Real-Time Scan Simulation**
   - Simulates scanning process
   - Retrieves actual code from database
   - Shows progress bar

3. **Error Handling**
   - Code not found: Shows fallback message
   - Server error: Displays connection error
   - Graceful degradation

#### Code Flow:
```typescript
handleDiagnose() {
  → fetch(`/api/obd/${code}`)
  → if success: Display MongoDB data
  → if not found: Show fallback
  → if error: Show error message
}
```

## 🔄 Data Flow

```
User Input (OBD Code)
    ↓
Frontend (OBDScanner.tsx)
    ↓
API Request (fetch)
    ↓
Backend (server/index.js)
    ↓
MongoDB Query (OBDCode.findOne)
    ↓
MongoDB Atlas Database
    ↓
Response to Frontend
    ↓
Display Results
```

## 🛠️ Setup Instructions

### 1. Ensure Backend is Running
```bash
cd server
npm install
node index.js
```
**Expected output:**
```
🚀 Server running on http://localhost:5000
✅ Connected to MongoDB
```

### 2. Import OBD Codes
```bash
cd server
node importOBDCodes.js
```

### 3. Start Frontend
```bash
cd ..
npm run dev
```

### 4. Test the System
1. Visit: http://localhost:8080/obd
2. Enter code: **P0171**
3. Click "Diagnose Code"
4. View results from MongoDB

## 📈 Adding More Codes

### Method 1: JSON Files (Recommended)
1. Edit or create JSON file in `server/data/`
2. Follow the schema structure:
```json
[
  {
    "code": "P0123",
    "make": "Honda",
    "meaning": "Code description",
    "possible_causes": ["Cause 1", "Cause 2"],
    "troubleshooting_steps": ["Step 1", "Step 2"]
  }
]
```
3. Run import script: `node importOBDCodes.js`

### Method 2: Direct API (For Future Enhancement)
Add POST endpoint to create new codes:
```javascript
app.post('/api/obd', async (req, res) => {
  const newCode = new OBDCode(req.body);
  await newCode.save();
  res.json({ success: true, data: newCode });
});
```

## 🔍 Current Dataset

### Total Codes: 7

#### Generic (3):
- P0171, P0300, P0420

#### Toyota (2):
- P1135, P1605

#### Ford (2):
- P1000, P1131

## 🚀 Future Enhancements

1. **Expand Dataset**
   - Add more manufacturer-specific codes
   - Include all major brands (Honda, BMW, Mercedes, etc.)
   - Add images/diagrams for each code

2. **Advanced Search**
   - Full-text search on all fields
   - Filter by severity
   - Search by symptoms

3. **AI Integration**
   - Use OpenAI/Claude to provide additional context
   - Generate repair cost estimates
   - Recommend nearby mechanics

4. **User Contributions**
   - Allow users to submit codes
   - Community-sourced solutions
   - Vote on best solutions

5. **Analytics**
   - Track most common codes
   - Popular searches
   - Code trends by vehicle make

## 📊 MongoDB Atlas Dashboard

**Connection String:**
```
mongodb+srv://2410030489_db_user:Svvk%402227@cluster0.x7avxez.mongodb.net/autobots
```

**Database:** autobots
**Collections:**
- users
- obdcodes

**View Data:**
1. Log into MongoDB Atlas
2. Navigate to Clusters → Collections
3. Select `autobots` database
4. Click on `obdcodes` collection

## 🧪 Testing

### Test OBD Codes:
```bash
# Generic code
curl http://localhost:5000/api/obd/P0171

# Toyota code
curl http://localhost:5000/api/obd/P1135

# Ford code
curl http://localhost:5000/api/obd/P1000

# Non-existent code (should return 404)
curl http://localhost:5000/api/obd/P9999

# Get all codes
curl http://localhost:5000/api/obd

# Get Toyota codes only
curl http://localhost:5000/api/obd?make=Toyota

# Search for "lean"
curl http://localhost:5000/api/obd/search/lean
```

## 📝 Code Examples

### Fetch Code in React/TypeScript:
```typescript
const fetchOBDCode = async (code: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/obd/${code}`);
    const data = await response.json();
    
    if (data.success) {
      console.log('Code:', data.data.code);
      console.log('Meaning:', data.data.meaning);
      console.log('Causes:', data.data.possible_causes);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🔐 Security Notes

- MongoDB credentials are in `.env` (not committed to Git)
- API currently has no rate limiting
- No authentication required for OBD endpoints
- Consider adding API keys for production

## 📞 Support

For issues or questions about the RAG system:
1. Check MongoDB connection
2. Verify data import completed successfully
3. Test API endpoints with curl
4. Check backend server logs
5. Review frontend browser console

---

**Last Updated:** January 19, 2025
**Version:** 1.0.0
**Status:** ✅ Operational
