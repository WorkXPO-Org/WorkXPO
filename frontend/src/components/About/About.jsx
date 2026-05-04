import Header from "../Header";

export default function About() {
  return (
    <>
      <Header />

      <section className="flex flex-col items-center justify-center m-20">

        <div className="min-w-[40%] max-w-[50%]">
            <h2 className="text-2xl font-bold text-dark border-b- border-b-dark mb-5">Sobre</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure aliquam exercitationem sint! Commodi placeat nemo autem? Laudantium ipsa cum ut veniam itaque. Dolor quas unde sed ipsam, odit facere dicta!</p>
        </div>

      </section>
    </>
  );
}
