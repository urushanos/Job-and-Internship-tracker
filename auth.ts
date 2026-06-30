import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),

  session: { strategy: "jwt" },

  ...authConfig,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});