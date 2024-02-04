"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { FormEvent, useRef, useState } from "react";
import { title } from "@/components/ui/primitives";
import { authAPI } from "../services";
import {
  createAdaptedSignUpFormDataError,
  createAdaptedUserAndTokens,
} from "../adapters";
import { AdaptedSignUpFormDataError } from "../adapters/types";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState<string>();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<AdaptedSignUpFormDataError>();
  const inProgress = useRef(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inProgress.current) return;
    inProgress.current = true;

    await authAPI
      .signUp({ username, email, password1, password2 })
      .then((data) => createAdaptedUserAndTokens(data))
      .then(({ accessToken, refreshToken }) =>
        signIn("SignUp", {
          accessToken,
          refreshToken,
          redirect: true,
          callbackUrl: "/",
        })
      )
      .catch((error) =>
        setError(createAdaptedSignUpFormDataError(error.response.data))
      )
      .finally(() => (inProgress.current = false));
  };

  return (
    <Card className="min-w-72 max-w-[30rem]">
      <CardHeader className="flex w-full justify-center">
        <h1 className={title({ size: "sm", className: "text-center" })}>
          Registrarse
        </h1>
      </CardHeader>
      <CardBody>
        <form id="signUpForm" onSubmit={onSubmit} className="space-y-4">
          {error?.nonFieldErrors ? (
            <p className="text-small text-danger text-center">
              {error.nonFieldErrors.join("\n")}
            </p>
          ) : null}
          <Input
            isRequired
            label="Username"
            type="text"
            value={username}
            onValueChange={setUsername}
            errorMessage={error?.username?.join("\n")}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onValueChange={setEmail}
            errorMessage={error?.email?.join("\n")}
          />
          <Input
            isRequired
            label="Password 1"
            type="password"
            value={password1}
            onValueChange={setPassword1}
            errorMessage={error?.password1?.join("\n")}
          />
          <Input
            isRequired
            label="Password 2"
            type="password"
            value={password2}
            onValueChange={setPassword2}
            errorMessage={error?.password2?.join("\n")}
          />
          <p className="text-center text-small">
            ¿Ya tienes una cuenta?{" "}
            <Link as={NextLink} href="/sign-in" size="sm">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </CardBody>
      <CardFooter>
        <Button form="signUpForm" type="submit" color="primary" fullWidth>
          Registrarse
        </Button>
      </CardFooter>
    </Card>
  );
}
