import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("[MONGO-DB] Connection URI -", process.env.CONNECTION_STRING);
    const connect = await mongoose.connect(
      String(process.env.CONNECTION_STRING)
    );
    console.log(
      "[MONGO-DB] Connected -",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
