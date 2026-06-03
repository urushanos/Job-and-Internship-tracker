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

export async function connectDB(): Promise<typeof mongoose> {
  // Already connected — reuse
  if (cache.conn) return cache.conn;

  // Connection in progress — wait for it
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_URI);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
