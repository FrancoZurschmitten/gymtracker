import { subtitle, title } from "@/components/ui/primitives";
import { Card, CardBody } from "@nextui-org/react";
import NextLink from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Aplica el&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>
            metodo científico&nbsp;
          </h1>
          <br />
          <h1 className={title()}>a tus entrenamientos.</h1>

          <h2 className={subtitle()}>Registrá tu progreso en el gimnasio.</h2>
        </div>
      </section>

      <div className="mx-auto pb-8 md:pb-10 max-w-5xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card isBlurred isPressable as={NextLink} href="/exercises">
            <CardBody>
              <h2 className="text-xl text-primary font-bold">Ejercicios</h2>

              <p className="text-default-500">
                En este modulo vas a poder encontrar una tabla en la que podras
                agregar nuevos ejercicios, editarlos, borrarlos y compartirlos a
                la comunidad.
              </p>
            </CardBody>
          </Card>
          <Card isBlurred isPressable as={NextLink} href="/notes">
            <CardBody>
              <h2 className="text-xl text-primary font-bold">Notas</h2>

              <p className="text-default-500">
                En este modulo crearas tus notas y llevaras el registro de tu
                progreso!
              </p>
            </CardBody>
          </Card>
        </section>
      </div>
    </>
  );
}
