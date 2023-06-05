import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import EmailProvider from "next-auth/providers/email";
import { getServerSession } from "next-auth";

const adminEmails = ['****6@gmail.com']

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session,token,user}) => {
      if(adminEmails.includes(session?.user?.email)){
        return session;
      }else{
        return false;
      }
    }
  }
}

export default NextAuth(authOptions);

export async function isAdminRequest(req, res){
  const session = await getServerSession(req, res, authOptions);
  if(!adminEmails.includes(session?.user?.email)){
    res.status(401);
    res.end();
    throw 'Not an Admin';
  }
}
