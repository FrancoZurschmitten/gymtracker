import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { createAdaptedUser, createAdaptedUserAndTokens } from "./adapters";
import { AdaptedUserAndTokens } from "./adapters/types";
import { authAPI } from "./services";

const accessMaxAge = 60 * 5;
const refreshMaxAge = 60 * 60 * 24;
const accessTokenExpiration = Math.floor(Date.now() / 1000 + accessMaxAge);

const signInProvider = CredentialsProvider({
  id: "SignIn",
  name: "SignIn",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials) return null;

    return await authAPI
      .signIn(credentials)
      .then((data) => createAdaptedUserAndTokens(data) as any)
      .catch(() => null);
  },
});

const signUpProvider = CredentialsProvider({
  id: "SignUp",
  name: "SignUp",
  credentials: {
    accessToken: { label: "Access token", type: "password" },
    refreshToken: { label: "Refresh token", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials) return null;

    try {
      const adaptedUser = await authAPI
        .getCurrentUser(credentials.accessToken)
        .then((data) => createAdaptedUser(data));

      const userAndTokens: AdaptedUserAndTokens = {
        user: adaptedUser,
        ...credentials,
      };

      return userAndTokens as any;
    } catch {
      return null;
    }
  },
});

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: refreshMaxAge,
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [signInProvider, signUpProvider],
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ account, token, user }) {
      if (account) {
        token.user = user.user;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expires_at = accessTokenExpiration;
        return token;
      }

      if (Date.now() > token.expires_at) {
        try {
          token.accessToken = await authAPI.refreshAccessToken(
            token.refreshToken
          );
          token.expires_at = accessTokenExpiration;
        } catch {
          token["error"] = "RefreshAccessTokenError" as const;
        }
      }

      return token;
    },
    async session({ token, session }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.error = token.error;
      return session;
    },
  },
};
