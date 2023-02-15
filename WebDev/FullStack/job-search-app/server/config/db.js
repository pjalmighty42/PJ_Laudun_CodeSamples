const mongoose = require("mongoose");
const { execSync } = require("child_process");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `Connected to MongoDB @ ${connection.connection.host}`.cyan.underline.bold
    );
  } catch (e) {
    console.log(e.red.underline.bold);
  }
};

module.exports = { connectDB };
