import CredentialsProvider from "next-auth/providers/credentials";
import { collctions, connect } from "./connect";
import { loginUser } from "@/action/server/auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await loginUser(credentials);

        return user;
      },
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      // User exist or not
        const isExist = await connect(collctions.USERS).findOne({email: user.email, provider: account.provider});
        if (isExist) {
          return true;
        }
      
        // create new user
        const newUser = {
          email: user.email,
          name: user.name,
          provider: account.provider,
          createAt: new Date(),
          role: "user",
        };
      
        //insert user
        const result = await connect(collctions.USERS).insertOne(newUser);

        return result.acknowledged;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    // async session({ session, token, user }) {
    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};
