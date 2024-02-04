import NextAuth from "next-auth";
import { AdaptedUser, AdaptedUserAndTokens } from "@/app/(auth)/adapters/types";

declare module "next-auth" {
  interface User extends AdaptedUserAndTokens {}

  interface Account extends Partial<TokenSet> {
    providerAccountId: string;
    userId?: string;
    provider: string;
    type: ProviderType;
    meta: AdaptedUserAndTokens;
  }

  interface Session {
    user: AdaptedUser;
    accessToken: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT
    extends Record<string, unknown>,
      DefaultJWT,
      AdaptedUserAndTokens {
    expires_at: number;
    error?: "RefreshAccessTokenError";
  }
}
