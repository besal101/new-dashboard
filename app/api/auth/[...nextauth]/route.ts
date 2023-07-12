import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions, Session } from "next-auth";
import bcrypt from "bcrypt";

import prisma from "@/utils/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error("Invalid email");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid password");
        }

        if (user?.role !== "admin") {
          throw new Error("You are not Authorized");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async session(params) {
      const session = params.session as Session;

      const userData = await prisma.user.findUnique({
        where: { email: session.user?.email as string },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      session.user = { ...session.user, ...userData };

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
