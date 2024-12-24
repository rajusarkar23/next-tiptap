import mongoose from "mongoose";

// type connectionObject = {
//   isConnected?: number;
// };

// const connection: connectionObject = {};

const MONGO_URI = process.env.MONGO_URI;


if (!MONGO_URI) {
  throw new Error("Invalid mongo URI.");
}

async function dbConnection() {

  try {
    await mongoose.connect(MONGO_URI);
    return
  } catch (error) {
    return error;
  }
}

export default dbConnection;
