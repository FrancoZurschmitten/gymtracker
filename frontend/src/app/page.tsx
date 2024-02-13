import { subtitle, title } from "@/components/ui/primitives";
import { Card, CardBody, Spacer } from "@nextui-org/react";
import NextLink from "next/link";

const modules = [
  {
    name: "Ejercicios",
    href: "/exercises",
    description: (
      <>
        En este modulo vas a poder encontrar una tabla en la que podras agregar
        nuevos ejercicios, editarlos, borrarlos y compartirlos a la comunidad.
      </>
    ),
  },
  {
    name: "Notas",
    href: "/notes",
    description: (
      <>
        En este modulo crearas tus notas y llevaras el registro de tu progreso!
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <section className="flex justify-center py-8 md:py-10">
        <div className="max-w-2xl text-center leading-8 md:leading-10">
          <h1 className={title({ size: "lg" })}>Aplica el&nbsp;</h1>
          <br />
          <h1 className={title({ size: "lg", color: "violet" })}>
            metodo científico&nbsp;
          </h1>
          <br />
          <h1 className={title({ size: "lg" })}>a tus entrenamientos.</h1>

          <h2 className={subtitle()}>Registrá tu progreso.</h2>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map(({ name, href, description }) => (
          <Card
            key={href}
            isBlurred
            isHoverable
            isPressable
            as={NextLink}
            href={href}
          >
            <CardBody>
              <h2 className={title({ size: "xs", color: "blue" })}>{name}</h2>
              <Spacer />
              <p className="text-default-500">{description}</p>
            </CardBody>
          </Card>
        ))}
      </section>
    </>
  );
}
