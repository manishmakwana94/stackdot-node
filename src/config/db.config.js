const mongoose = require('mongoose');
const  seedDatabase  = require('../helper/default-record-seed');


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.APP_MONGO_URI);
    mongoose.set('allowDiskUse', true);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // await createCollections();
    if(process.env.SEED_UPDATE === 'true'){
      await seedDatabase();
    }
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
const createCollections = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);

    // const models = [
    //   { name: "users", model: User },
    // ];

    for (const { name, model } of models) {
      if (!collectionNames.includes(name)) {
        await mongoose.connection.createCollection(name);
        console.log(`Collection '${name}' created`);
      }
    }
  } catch (error) {
    console.error("Error creating collections:", error.message);
  }
};

module.exports = connectDB;