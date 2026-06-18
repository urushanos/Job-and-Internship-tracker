import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env.local");
}

// Cache the connection across hot-reloads in development.
// Without this, Next.js would open a new connection on every API call.
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache;
}

if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}

const cache = global._mongooseCache;

// Mongoose options optimised for MongoDB Atlas
const mongooseOpts = {
  bufferCommands: false,           // surface errors immediately instead of queuing
  serverSelectionTimeoutMS: 10000, // fail fast if Atlas is unreachable (10 s)
  socketTimeoutMS: 45000,          // close idle sockets after 45 s
};

export async function connectDB(): Promise<typeof mongoose> {
  // Already connected, reuse
  if (cache.conn) return cache.conn;

  // Connection in progress — wait for it
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_URI, mongooseOpts).catch((err) => {
      // Reset so the next request can attempt a fresh connection
      cache.promise = null;
      throw err;
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
