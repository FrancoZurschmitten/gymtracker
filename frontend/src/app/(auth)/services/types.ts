export interface SignInProps {
  username: string;
  password: string;
}

export interface SignUpProps {
  username: string;
  email: string | undefined;
  password1: string;
  password2: string;
}

export type User = {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type UserAndTokens = {
  user: User;
  access: string;
  refresh: string;
};

export interface SignUpFormDataError {
  non_field_errors?: string[];
  username?: string[];
  email?: string[];
  password1?: string[];
  password2?: string[];
}
