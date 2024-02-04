"use client";

import { ThemeProvider } from "./theme-provider";
import { SessionProvider } from "next-auth/react";

export function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
