export type AdaptedUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type AdaptedUserAndTokens = {
  user: AdaptedUser;
  accessToken: string;
  refreshToken: string;
};

export interface AdaptedSignUpFormDataError {
  nonFieldErrors?: string[];
  username?: string[];
  email?: string[];
  password1?: string[];
  password2?: string[];
}
