const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://2410030489_db_user:Svvk%402227@cluster0.x7avxez.mongodb.net/autobots?retryWrites=true&w=majority';

// Vehicle Schema
const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  engine: {
    type: String
  },
  horsepower: {
    type: String
  },
  transmission: {
    type: String
  },
  drivetrain: {
    type: String
  },
  fuel_economy: {
    type: String
  },
  seating_capacity: {
    type: Number
  },
  price_range: {
    type: String
  },
  description: {
    type: String
  },
  key_features: [{
    type: String
  }],
  image_url: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create unique compound index
vehicleSchema.index({ make: 1, model: 1, year: 1 }, { unique: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing vehicles
    await Vehicle.deleteMany({});
    console.log('🗑️  Cleared existing vehicles');

    // Read all vehicle files
    const toyotaVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'toyota_vehicles.json'), 'utf8')
    );
    
    const hondaVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'honda_vehicles.json'), 'utf8')
    );
    
    const fordVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'ford_vehicles.json'), 'utf8')
    );

    const bmwVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'bmw_vehicles.json'), 'utf8')
    );

    const mercedesVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'mercedes_vehicles.json'), 'utf8')
    );

    const audiVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'audi_vehicles.json'), 'utf8')
    );

    const nissanVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'nissan_vehicles.json'), 'utf8')
    );

    const chevroletVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'chevrolet_vehicles.json'), 'utf8')
    );

    const volkswagenVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'volkswagen_vehicles.json'), 'utf8')
    );

    const hyundaiVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'hyundai_vehicles.json'), 'utf8')
    );

    const mazdaVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'mazda_vehicles.json'), 'utf8')
    );

    const jeepVehicles = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'jeep_vehicles.json'), 'utf8')
    );

    // Combine all vehicles
    const allVehicles = [
      ...toyotaVehicles,
      ...hondaVehicles,
      ...fordVehicles,
      ...bmwVehicles,
      ...mercedesVehicles,
      ...audiVehicles,
      ...nissanVehicles,
      ...chevroletVehicles,
      ...volkswagenVehicles,
      ...hyundaiVehicles,
      ...mazdaVehicles,
      ...jeepVehicles
    ];

    console.log(`📥 Importing ${allVehicles.length} vehicles...`);

    // Insert all vehicles
    const result = await Vehicle.insertMany(allVehicles);
    console.log(`✅ Imported ${result.length} vehicles successfully!`);

    // Display summary
    console.log('\n📊 Import Summary:');
    console.log(`   Toyota: ${toyotaVehicles.length}`);
    console.log(`   Honda: ${hondaVehicles.length}`);
    console.log(`   Ford: ${fordVehicles.length}`);
    console.log(`   BMW: ${bmwVehicles.length}`);
    console.log(`   Mercedes-Benz: ${mercedesVehicles.length}`);
    console.log(`   Audi: ${audiVehicles.length}`);
    console.log(`   Nissan: ${nissanVehicles.length}`);
    console.log(`   Chevrolet: ${chevroletVehicles.length}`);
    console.log(`   Volkswagen: ${volkswagenVehicles.length}`);
    console.log(`   Hyundai: ${hyundaiVehicles.length}`);
    console.log(`   Mazda: ${mazdaVehicles.length}`);
    console.log(`   Jeep: ${jeepVehicles.length}`);
    console.log(`   Total: ${result.length}`);

    // Display all imported vehicles by make
    console.log('\n📋 Imported Vehicles:');
    
    const makes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Chevrolet', 'Volkswagen', 'Hyundai', 'Mazda', 'Jeep'];
    
    makes.forEach(make => {
      console.log(`\n🚗 ${make}:`);
      result.filter(v => v.make === make).forEach(v => {
        console.log(`   ${v.year} ${v.model} - ${v.type}`);
      });
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
