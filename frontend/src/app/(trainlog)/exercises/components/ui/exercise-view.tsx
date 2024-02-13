import { title } from "@/components/ui/primitives";
import { AdaptedExercise } from "../../adapters/types";

export function ExerciseView({ itemView }: { itemView: AdaptedExercise }) {
  const { name, description, muscleGroup } = itemView;
  return (
    <section>
      <h2 className={title({ size: "sm" })}>{name}</h2>
      <p className="text-default-500">{description}</p>
      <p>{muscleGroup}</p>
    </section>
  );
}
