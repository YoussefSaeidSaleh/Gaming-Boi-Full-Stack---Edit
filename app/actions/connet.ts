import mongoose from "mongoose";

let cached = (global as any).mongoose || { conn: null, promise: null };

const connect = async () => {
  if (cached.conn) return cached.conn;
  
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  
  console.log("Connecting to MongoDB...");
  
  cached.promise =
    cached.promise ||
    mongoose
      .connect(process.env.MONGO_URI, {
        dbName: "learning",
        bufferCommands: false,
      })
      .then(() => {
        console.log("DB connected successfully!");
        return mongoose.connection;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        throw err;
      });
      
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Failed to establish MongoDB connection:", error);
    throw error;
  }
};

export default connect;
