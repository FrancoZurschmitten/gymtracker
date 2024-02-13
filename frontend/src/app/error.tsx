"use client";

import { ArrowClockwise } from "@/components/ui/icons";
import { subtitle, title } from "@/components/ui/primitives";
import { Button, Link } from "@nextui-org/react";
import { useEffect } from "react";
import NextLink from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ color: "pink" })}>Error</h1>
        <p className={subtitle()}>Oops! Something went wrong.</p>
      </div>

      <div className="flex gap-3">
        <Link isBlock showAnchorIcon color="primary" as={NextLink} href="/">
          Go home
        </Link>
        <Button
          onClick={reset}
          startContent={
            <ArrowClockwise className="text-lg pointer-events-none" />
          }
          variant="light"
          color="secondary"
        >
          Try again
        </Button>
      </div>
    </section>
  );
}
