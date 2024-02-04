import { API } from "@/services/utils";

import { SignInProps, SignUpProps, User, UserAndTokens } from "./types";

export async function signIn(credentials: SignInProps): Promise<UserAndTokens> {
  return await API.post("dj-rest-auth/login/", credentials).then(
    (res) => res.data
  );
}

export async function signUp(credentials: SignUpProps): Promise<UserAndTokens> {
  return await API.post("dj-rest-auth/registration/", credentials).then(
    (res) => res.data
  );
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<string> {
  return await API.post("dj-rest-auth/token/refresh/", {
    refresh: refreshToken,
  }).then((res) => res.data.access as string);
}

export async function getCurrentUser(accessToken: string): Promise<User> {
  return await API.get("dj-rest-auth/user/", {
    headers: { Authorization: "Bearer " + accessToken },
  }).then((res) => res.data);
}
