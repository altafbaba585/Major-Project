const mongoose = require("mongoose");
const Listing = require("../Models/listing.js");
const initdata = require("./data.js");

const mongo_url = "mongodb://127.0.0.1:27017/WonderLust";

mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
    return initDb();
  })
  .then(() => {
    console.log("Data initialization successful");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

async function initDb() {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Data is saved");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
}
