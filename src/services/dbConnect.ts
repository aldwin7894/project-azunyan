/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
declare global {
  var mongoose: any;
}

const MONGODB_URL = process.env["MONGODB_URL"];
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URL) {
    throw new Error(
      "Please define the MONGODB_URL environment variable inside .env.local",
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "project-azunyan",
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then(mongoose => {
      return mongoose;
    });
    console.info("\n ✓ CONNECTED TO DB");
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
