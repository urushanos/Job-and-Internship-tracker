import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/mongodb"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        })],
    pages: {
            signIn: "/login",
        }, 
    callbacks: {
    async session({ session, user }) {
        if (session.user) {
        session.user.id = user.id;
        }
    return session;
  },
},       
})