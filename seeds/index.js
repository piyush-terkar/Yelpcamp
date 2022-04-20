const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: "623589b73b1a1328b1b0bd37",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dgr8davna/image/upload/v1650026265/YelpCamp/cjmijeop69ccziwohhwg.jpg",
          filename: "YelpCamp/cjmijeop69ccziwohhwg",
        },
        {
          url: "https://res.cloudinary.com/dgr8davna/image/upload/v1650026266/YelpCamp/vomodixq8fwmosqqwwgj.jpg",
          filename: "YelpCamp/vomodixq8fwmosqqwwgj",
        },
      ],
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat est numquam obcaecati illo tempora pariatur reiciendis voluptate consectetur, asperiores sed perspiciatis dolores temporibus magni odio fugiat reprehenderit. Excepturi, quod dolor",
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
