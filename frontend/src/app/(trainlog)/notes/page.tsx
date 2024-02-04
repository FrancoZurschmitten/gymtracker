import { subtitle, title } from "@/components/ui/primitives";

export default function NotesPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Tus Notas</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Todas tus notas estan aqui!
        </p>
        <div className="flex flex-col mt-20">
          <h2 className={title({ size: "sm", color: "pink" })}>
            Aun este modulo no esta disponible.
          </h2>
          <p className={subtitle({ class: "mt-4" })}>Diosito dame tiempo!</p>
        </div>
      </div>
    </section>
  );
}
