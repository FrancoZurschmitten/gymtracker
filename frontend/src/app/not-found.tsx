import { subtitle, title } from "@/components/ui/primitives";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ color: "pink" })}>404</h1>
        <p className={subtitle()}>Not found</p>
      </div>

      <div className="flex gap-3">
        <Link isBlock showAnchorIcon color="primary" as={NextLink} href="/">
          Go home
        </Link>
      </div>
    </section>
  );
}
