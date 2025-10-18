import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "shawnmutogo5@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ShawnMutogo@22200207";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (
          credentials?.email === ADMIN_EMAIL &&
          credentials?.password === ADMIN_PASSWORD
        ) {
          return {
            id: "1",
            name: "Shawn Mutogo",
            email: ADMIN_EMAIL,
            image: null,
          };
        }
        return null;
      },
    }),
    // Google OAuth with your credentials
    ...(process.env.GOOGLE_CLIENT_ID && 
        process.env.GOOGLE_CLIENT_SECRET && 
        process.env.GOOGLE_CLIENT_ID !== "your-google-client-id" && 
        process.env.GOOGLE_CLIENT_ID.includes('.apps.googleusercontent.com') ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      })
    ] : []),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For Google OAuth, only allow your specific email
      if (account?.provider === "google") {
        return user.email === ADMIN_EMAIL;
      }
      // For credentials, we already verified in the authorize function
      return true;
    },
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
        session.user.name = "Shawn Mutogo";
        session.user.email = ADMIN_EMAIL;
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id;
        token.email = ADMIN_EMAIL;
        token.name = "Shawn Mutogo";
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
