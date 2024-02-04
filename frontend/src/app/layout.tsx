import type { Metadata } from "next";
import "./globals.css";
import { fontSans } from "@/config/fonts";
import { Navigation } from "@/components/ui/navigation";
import { ContextProvider } from "@/components/providers/context-provider";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "GymTracker",
  description: "Gym tracker app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          "min-h-screen bg-transparent font-sans antialiased",
          fontSans.variable
        )}
      >
        <ContextProvider>
          <div className="relative flex flex-col h-screen">
            <Navigation />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
