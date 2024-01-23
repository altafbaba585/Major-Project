const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Listing = require("./Models/listing.js");

// Set up view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//use of Ejs-mate and static page of styling
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDB connection URL
const mongoUrl = "mongodb://127.0.0.1:27017/WonderLust";

// Main function to connect to the database
async function main() {
  await mongoose.connect(mongoUrl);
}

// Home route
app.get("/", (req, res) => {
  res.send("This is TONY STARK");
});

// Index route - listings
app.get("/listing", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// New route
app.get("/listing/new", async (req, res) => {
  res.render("listings/new.ejs");
});

// Show route
app.get("/listing/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Create listing
app.post("/listing", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listing");
});

//Edit Route
app.get("/listing/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listing/:id", async (req, res) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );
  res.redirect(`/listing/${updatedListing._id}`);
});

//Delete Route
app.delete("/listing/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listing");
});

// Start the server
const PORT = 3000;
main()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
