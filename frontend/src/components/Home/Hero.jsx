export default function Hero() {
  const innovationImage = "idea.svg";

  return (
    <section className="flex flex-row items-center justify-around mx-auto max-w-6xl min-h-[70vh] gap-10 text-justify">
      <div className="flex-1">
        <h1 className="text-5xl font-extrabold text-dark mb-6">
          Sua Inovação começa aqui!
        </h1>
        <p className="text-xl text-dark max-w-xl leading-relaxed mb-5">
          Transforme sua pesquisa em solução real. O
          <span className="font-bold"> WorkXPO</span> conecta a inovação
          acadêmica ao mercado, gerando visibilidade, apoio estrutural e o
          reconhecimento que o seu talento merece.
        </p>

        <button className="bg-primary text-xl text-text-light px-8 py-3 rounded-xl font-bold hover:bg-dark transition-all">
          <a href="/submit-project">Envie seu Projeto</a>
        </button>
      </div>

      <div className="flex flex-1 justify-end">
        <img
          src={innovationImage}
          alt="Women surprised holding a light bulb with lights comming off of it like an idea"
          className="w-full max-w-md object-contain"
        />
      </div>
    </section>
  );
}
