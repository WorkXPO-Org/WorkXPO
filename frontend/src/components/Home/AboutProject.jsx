export default function AboutProject() {
  const FUNCTIONALITIES_ITEMS = [
    {
      label: "Criação de Projetos",
      explanation:
        "Usuários podem registrar seus trabalhos            acadêmicos facilmente.",
    },
    {
      label: "Informações Detalhadas",
      explanation:
        "Permite adicionar dados abrangentes, como área de pesquisa, metodologia, apoio necessário (financeiro/estrutural) e resultados.",
    },
    {
      label: "Cadastro de Usuário Simplificado",
      explanation: "Processo rápido de inscrição para os estudantes.",
    },
    {
      label: "Autenticação e Autorização",
      explanation:
        "Sistema de login seguro, garantindo que os usuários gerenciem apenas seus próprios projetos e dados.",
    },
    {
      label: "Vitrine Responsiva",
      explanation:
        "Uma interface moderna e centralizada para explorar projetos por categoria.",
    },
  ];

  return (
    <section className="card-project">
      <h2>Sobre o Projeto</h2>
      <h3>O que é o WorkXPO?</h3>
      <p>
        O WorkXPO é uma ponte entre o mundo acadêmico e o mercado corporativo. A
        plataforma foi idealizada para expor projetos acadêmicos inovadores,
        proporcionando a visibilidade necessária para atrair apoio
        institucional, infraestrutura e investimento financeiro.
      </p>

      <h3>Funcionalidades</h3>
      <div>
        <p>
          A plataforma está sendo desenvolvida para oferecer uma experiência
          fluida tanto para estudantes quanto para empresas:
        </p>

        <ul>
          {FUNCTIONALITIES_ITEMS.map((items) => (
            <li key={items.label}>
              <span className="font-semibold">{items.label}: </span>
              {items.explanation}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
