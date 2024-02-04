"use client";
import { subtitle, title } from "@/components/ui/primitives";
import { ArrowClockwise } from "@/components/ui/icons";
import { Button } from "@nextui-org/button";
import { useEffect } from "react";

export function EmptyContent({
  isLoading,
  loadingState,
  error,
  reset,
}: {
  isLoading?: boolean;
  loadingState?: "loading" | "idle";
  error?: any;
  reset?: () => void;
}) {
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  if (error)
    return (
      <div className="inline-block max-w-lg text-center justify-center">
        <h4 className={title({ size: "sm", color: "pink" })}>Error</h4>
        <p className={subtitle()}>Oops! Something went wrong.</p>

        <Button
          size="sm"
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
    );

  if (isLoading || loadingState === "loading") return null;

  return "No hay nada";
}
