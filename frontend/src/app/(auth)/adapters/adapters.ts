import { SignUpFormDataError, User, UserAndTokens } from "../services/types";
import {
  AdaptedSignUpFormDataError,
  AdaptedUser,
  AdaptedUserAndTokens,
} from "./types";

export function createAdaptedUser(data: User): AdaptedUser {
  const formattedData: AdaptedUser = {
    ...data,
    id: data.pk,
    firstName: data.first_name,
    lastName: data.last_name,
  };
  return formattedData;
}

export function createAdaptedUserAndTokens(data: UserAndTokens) {
  const formattedData: AdaptedUserAndTokens = {
    user: createAdaptedUser(data.user),
    accessToken: data.access,
    refreshToken: data.refresh,
  };
  return formattedData;
}

export function createAdaptedSignUpFormDataError(
  data: SignUpFormDataError
): AdaptedSignUpFormDataError {
  const formattedData: AdaptedSignUpFormDataError = {
    ...data,
    nonFieldErrors: data.non_field_errors,
  };
  return formattedData;
}
