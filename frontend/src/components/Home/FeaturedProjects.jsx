import ProjectCard from "../ProjectCard";

export default function FeaturedProjects() {
  return (
    <section className="card-project">
      <h2 className="mb-5">Projetos Destacados</h2>
      <ProjectCard
        title={"Utilizando IA para Cálculos Matemáticos"}
        category={"Computação"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro voluptates ipsam minima vitae dicta cum iusto earum et deleniti hic voluptate beatae voluptatibus saepe, repudiandae sapiente dolor. Minima, nisi saepe!"
        }
        image={"https://placehold.co/600x300"}
      ></ProjectCard>
    </section>
  );
}
