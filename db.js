const mongoose = require("mongoose");
const connectionURL = "env";

const connectToDB = async () => {
  await mongoose.connect(connectionURL);
};

module.exports = connectToDB;
