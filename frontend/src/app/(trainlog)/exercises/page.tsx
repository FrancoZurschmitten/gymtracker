import ExerciseTable from "./components/ui/exercise-table";
import { subtitle, title } from "@/components/ui/primitives";

export default async function ExercisesPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Tus Ejercicios</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Todos los ejercicios creados por ti y solo para ti.
        </p>
      </div>
      <div className="inline-block max-w-5xl w-full pt-4 space-y-10">
        <ExerciseTable />
      </div>
    </section>
  );
}
