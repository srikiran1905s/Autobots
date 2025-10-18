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

    // Read additional codes
    const additionalCodes = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'additional_generic_codes.json'), 'utf8')
    );

    console.log(`📥 Found ${additionalCodes.length} new codes to import...`);

    // Insert codes one by one to handle duplicates
    let importedCount = 0;
    let skippedCount = 0;

    for (const codeData of additionalCodes) {
      try {
        await OBDCode.create(codeData);
        importedCount++;
        console.log(`   ✅ Imported: ${codeData.code}`);
      } catch (error) {
        if (error.code === 11000) {
          // Duplicate key error
          skippedCount++;
          console.log(`   ⚠️  Skipped (already exists): ${codeData.code}`);
        } else {
          console.error(`   ❌ Error importing ${codeData.code}:`, error.message);
        }
      }
    }

    console.log('\n📊 Import Summary:');
    console.log(`   ✅ Successfully imported: ${importedCount} codes`);
    console.log(`   ⚠️  Skipped (duplicates): ${skippedCount} codes`);
    console.log(`   📝 Total processed: ${additionalCodes.length} codes`);

    // Show total count in database
    const totalCount = await OBDCode.countDocuments();
    console.log(`   📚 Total codes in database: ${totalCount}`);

    mongoose.connection.close();
    console.log('\n✅ Import complete. Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
}

importData();
