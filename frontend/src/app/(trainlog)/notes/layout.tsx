import { subtitle, title } from "@/components/ui/primitives";

export default function NotesLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <section className="flex justify-center py-8 md:py-10">
        <div className="max-w-2xl text-center leading-8 md:leading-10">
          <h1 className={title()}>Tus Notas</h1>
          <h2 className={subtitle()}>Todas tus notas estan aqui!</h2>
        </div>
      </section>

      {children}
    </>
  );
}
