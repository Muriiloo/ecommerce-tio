import { DefaultSession, DefaultUser } from "next-auth";
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
  }

  interface User {
    id: string;
    isAdmin: boolean;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      isAdmin: boolean;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
