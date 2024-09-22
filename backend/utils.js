const axios = require("axios");
require("dotenv").config();

const getRandomDelay = () => Math.floor(Math.random() * 60000) + 5000; // Random delay between 5s and 1min

const fetchRandomImage = async () => {
  console.log("PROCESS ", process.env.CLIENT_ID);
  const response = await axios.get("https://api.unsplash.com/photos/random", {
    params: {
      query: "food",
      client_id: process.env.CLIENT_ID, // Use environment variable for API key
    },
  });
  return response.data.urls.regular;
};

module.exports = {
  getRandomDelay,
  fetchRandomImage,
};
