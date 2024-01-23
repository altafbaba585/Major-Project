const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://unsplash.com/photos/3d-render-of-building-exterior-L5nd7rPrEic",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/3d-render-of-building-exterior-L5nd7rPrEic"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});
const listing = mongoose.model("listing", ListingSchema);
module.exports = listing;
