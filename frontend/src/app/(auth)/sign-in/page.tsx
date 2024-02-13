import { Suspense } from "react";
import SignInForm from "./form";

export default function SignInPage() {
  return (
    <section className="max-w-sm m-auto py-8 md:py-10">
      <Suspense>
        <SignInForm />
      </Suspense>
    </section>
  );
}
