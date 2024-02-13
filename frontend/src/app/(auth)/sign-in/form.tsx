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
import { useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { FormEvent, useRef, useState } from "react";
import { title } from "@/components/ui/primitives";
import ErrorView from "@/components/ui/error-view";

export default function SignInForm() {
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    searchParams.get("error") === "CredentialsSignin"
      ? "No puede iniciar sesión con las credenciales proporcionadas."
      : undefined
  );
  const inProgress = useRef(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inProgress.current) return;
    inProgress.current = true;

    await signIn("SignIn", {
      username,
      password,
      redirect: true,
      callbackUrl: searchParams.get("callbackUrl") ?? "/",
    })
      .catch((error) => console.error(error))
      .finally(() => (inProgress.current = false));
  };

  return (
    <Card fullWidth>
      <CardHeader className="justify-center">
        <h1 className={title()}>Inicio de sesión</h1>
      </CardHeader>
      <CardBody>
        <form id="signInForm" onSubmit={handleSubmit} className="space-y-4">
          <ErrorView message={error} />
          <Input
            isRequired
            label="Username"
            type="text"
            value={username}
            onValueChange={setUsername}
          />
          <Input
            isRequired
            label="Password"
            type="password"
            value={password}
            onValueChange={setPassword}
          />
          <p className="text-center text-small">
            Necesitas crearte una cuenta?{" "}
            <Link as={NextLink} href="/sign-up" size="sm">
              Registrarse
            </Link>
          </p>
        </form>
      </CardBody>
      <CardFooter>
        <Button
          size="lg"
          form="signInForm"
          type="submit"
          color="primary"
          fullWidth
        >
          Iniciar session
        </Button>
      </CardFooter>
    </Card>
  );
}
