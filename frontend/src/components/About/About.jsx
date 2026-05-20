import Header from "../Header";

export default function About() {
  return (
    <>
      <Header />

      <section className="flex flex-col items-center justify-center m-20">
        <div className="w-full max-w-6xl px-8 py-10 bg-secondary border border-dark/10 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold text-dark border-b border-dark/20 pb-3 mb-6">Sobre</h2>

          <div className="space-y-6 text-text-main leading-7">
            <p>
              A plataforma está sendo desenvolvida para oferecer uma experiência fluida tanto para estudantes quanto para empresas.
              Usuários podem registrar seus trabalhos acadêmicos facilmente, adicionar informações detalhadas sobre área de pesquisa, metodologia,
              apoio necessário (financeiro/estrutural) e resultados.
            </p>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-dark">Funcionalidades principais</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Cadastro de projetos acadêmicos com objetivos, metodologia, apoio necessário e resultados previstos.</li>
                <li>Perfis de estudantes e empresas para facilitar conexões entre pesquisa e oportunidades reais.</li>
                <li>Controle de acesso seguro para que cada usuário gerencie seus projetos com privacidade.</li>
                <li>Pesquisa e vitrine responsivas para encontrar trabalhos por área, etapa ou tipo de colaboração.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-dark">Tecnologias</h3>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/90 px-4 py-2 text-sm text-dark">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="128" cy="128" r="20" fill="currentColor" />
                    <ellipse cx="128" cy="128" rx="90" ry="34" transform="rotate(45 128 128)" stroke="currentColor" strokeWidth="20" fill="none" />
                    <ellipse cx="128" cy="128" rx="90" ry="34" transform="rotate(-45 128 128)" stroke="currentColor" strokeWidth="20" fill="none" />
                    <ellipse cx="128" cy="128" rx="90" ry="34" transform="rotate(0 128 128)" stroke="currentColor" strokeWidth="20" fill="none" />
                  </svg>
                  React.js
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/90 px-4 py-2 text-sm text-dark">
                  <svg className="h-5 w-5 text-accent" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M101.5 219.3c0-59.7 49.5-108.2 110.7-108.2 59.8 0 109 44.8 109 100.1 0 55.3-47.7 99.4-107.1 99.4-58.6 0-102.7-43.2-102.7-91.3 0-10.7 8.7-19.4 19.4-19.4h2.6c9.7 0 17.5 7.8 17.5 17.5 0 21.3 16.6 38.6 37.8 38.6 20.8 0 38.4-16.6 38.4-36.9 0-27.7-22.8-50.2-51-50.2-28 0-51 22.2-51 49.5 0 31.6 27.9 57.5 62.2 57.5 16 0 30.8-5.4 42.5-14.4 8.9-6.9 15.6-16.1 18.7-26.6h.2c1.2-4.4 4.6-7.5 9.1-7.5h.3c5.1.1 9.3 4.3 9.3 9.4 0 6.5-3 12.6-8.3 16.4-16.4 12.8-37.7 20.4-60.8 20.4-30.4 0-58.3-14.5-73.9-36.9-2.4-3.3-3.7-7.3-3.7-11.4z" fill="currentColor" opacity="0.35" />
                    <path d="M108.2 277.8c0-50.8 41.1-92.1 91.7-92.1 49.7 0 90.6 39.5 90.6 88 0 48.4-40.9 87.7-90.6 87.7-45.8 0-82.2-34.5-82.2-76.5 0-8.9 7.2-16.1 16.1-16.1h2.2c8.9 0 16.1 7.2 16.1 16.1 0 34.6 28.3 62.7 63.9 62.7 33.6 0 60.7-26.8 60.7-59.8 0-30-25.5-54.4-57.5-54.4-31.5 0-57.5 24.6-57.5 54.9 0 34.8 30.7 63.6 67.5 63.6 17.4 0 33.4-6 45.2-16 8.1-6.4 14.2-15 17.1-24.8h.2c1.1-4.2 4.4-7.2 8.7-7.2h.3c4.9.1 8.9 4.1 8.9 9 0 6.2-2.9 12.1-8.1 15.8-16.1 12.6-37 20.1-59.8 20.1-29.9 0-57.4-14.7-72.9-37.4-2.4-3.1-3.6-6.8-3.6-10.7z" fill="currentColor" />
                  </svg>
                  TailwindCSS
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/90 px-4 py-2 text-sm text-dark">
                  <svg className="h-5 w-5" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M102 212c-40 0-62-25-62-48 0-22 14-44 62-44 48 0 62 22 62 44 0 23-22 48-62 48z" fill="#5382a1" opacity="0.15" />
                    <path d="M90 170c2 20 34 29 54 29s52-9 54-29" stroke="#5382a1" strokeWidth="18" strokeLinecap="round" />
                    <path d="M105 133c0 0 10-10 20-10s20 10 20 10" stroke="#5382a1" strokeWidth="18" strokeLinecap="round" />
                    <path d="M104 81s-3 18 14 26c17 8 30-3 30-3" stroke="#ef3d23" strokeWidth="18" strokeLinecap="round" fill="none" />
                    <path d="M110 56s-1 16 12 22c13 6 21-1 21-1" stroke="#ef3d23" strokeWidth="18" strokeLinecap="round" fill="none" />
                    <path d="M124 27s0 16 10 23c10 7 18 2 18 2" stroke="#ef3d23" strokeWidth="18" strokeLinecap="round" fill="none" />
                    <path d="M78 174h122c8 0 14 6 14 14s-6 14-14 14H78c-8 0-14-6-14-14s6-14 14-14z" fill="#5382a1" />
                  </svg>
                  Java
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/90 px-4 py-2 text-sm text-dark">
                  <svg className="h-5 w-5 text-[#3bbd84]" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="16" y="16" width="224" height="224" rx="48" fill="currentColor" opacity="0.15" />
                    <path d="M71 74c0-8 6-14 14-14h86c8 0 14 6 14 14v88c0 8-6 14-14 14H85c-8 0-14-6-14-14V74z" stroke="currentColor" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M108 96h40c8 0 14 6 14 14s-6 14-14 14h-40c-8 0-14 6-14 14s6 14 14 14h26" stroke="currentColor" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Supabase
                </span>
              </div>
              <p>
                Frontend: <strong>React.js</strong> para criar a interface dinâmica e <strong>TailwindCSS</strong> para estilização moderna e responsiva.
                Backend: <strong>Java</strong> com <strong>Supabase</strong> para gerenciar autenticação, banco de dados e APIs.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-dark">Equipe de desenvolvimento</h3>
              <ul className="list-disc list-inside space-y-3">
                <li className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-dark">Bruno da Silva</span>
                  <a
                    href="https://github.com/BrunoSP1989"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.107-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.102.81 2.222 0 1.606-.015 2.904-.015 3.296 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    @BrunoSP1989
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-dark">Lázaro Kauã</span>
                  <a
                    href="https://github.com/lazarokaua"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.107-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.102.81 2.222 0 1.606-.015 2.904-.015 3.296 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    @lazarokaua
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-dark">Rafael Oliveira</span>
                  <a
                    href="https://github.com/rafinho0"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.107-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.102.81 2.222 0 1.606-.015 2.904-.015 3.296 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    @rafinho0
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-dark">Valmir Orçai</span>
                  <a
                    href="https://github.com/valmirfialho"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.107-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.102.81 2.222 0 1.606-.015 2.904-.015 3.296 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    @valmirfialho
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-dark">Repositório</h3>
              <a
                href="https://github.com/WorkXPO-Org/WorkXPO"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-dark font-semibold hover:text-primary transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.107-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.102.81 2.222 0 1.606-.015 2.904-.015 3.296 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                https://github.com/WorkXPO-Org/WorkXPO
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
