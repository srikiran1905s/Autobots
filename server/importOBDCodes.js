const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://2410030489_db_user:Svvk%402227@cluster0.x7avxez.mongodb.net/autobots?retryWrites=true&w=majority';

// OBD Code Schema
const obdCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  make: {
    type: String,
    default: 'Generic'
  },
  meaning: {
    type: String,
    required: true
  },
  possible_causes: [{
    type: String
  }],
  troubleshooting_steps: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const OBDCode = mongoose.model('OBDCode', obdCodeSchema);

async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing codes
    await OBDCode.deleteMany({});
    console.log('🗑️  Cleared existing OBD codes');

    // Read and import generic codes
    const genericCodes = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'generic_codes.json'), 'utf8')
    );
    const genericCodesWithMake = genericCodes.map(code => ({
      ...code,
      make: 'Generic'
    }));

    // Read and import Toyota codes
    const toyotaCodes = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'toyota_codes.json'), 'utf8')
    );

    // Read and import Ford codes
    const fordCodes = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'ford_codes.json'), 'utf8')
    );

    // Combine all codes
    const allCodes = [...genericCodesWithMake, ...toyotaCodes, ...fordCodes];

    // Insert all codes
    const result = await OBDCode.insertMany(allCodes);
    console.log(`✅ Imported ${result.length} OBD codes successfully!`);

    // Display summary
    console.log('\n📊 Import Summary:');
    console.log(`   Generic codes: ${genericCodesWithMake.length}`);
    console.log(`   Toyota codes: ${toyotaCodes.length}`);
    console.log(`   Ford codes: ${fordCodes.length}`);
    console.log(`   Total: ${result.length}`);

    // Display all imported codes
    console.log('\n📋 Imported Codes:');
    result.forEach(code => {
      console.log(`   ${code.code} (${code.make}) - ${code.meaning}`);
    });

    mongoose.connection.close();
    console.log('\n✅ Import complete. Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
}

importData();
