import { Link } from "react-router-dom";

export default function Header() {
  const MENU_ITEMS = [
    { label: "Home", path: "/" },
    { label: "Vitrine de Projetos", path: "/projects" },
    { label: "Indicadores", path: "/metrics" }, 
    { label: "Sobre", path: "/about" },
  ];

  return (
    <header className="header shadow-md">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-text-main">
          <Link to="/">WorkXPO</Link>
        </h1>
      </div>

      <nav className="flex-none">
        <ul className="flex gap-10 text-lg font-semibold text-text-main font-sans">
          {MENU_ITEMS.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="hover:text-dark transition-colors duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-1 flex justify-end items-center gap-6">
        <Link
          to="/signin"
          className="text-text-main font-semibold hover:text-dark transition-colors font-sans"
        >
          Entrar
        </Link>

        <Link
          to="/signup"
          className="bg-dark text-white px-6 py-2 rounded-full font-bold hover:bg-dark/90 transition-all shadow-md font-sans"
        >
          Criar Conta
        </Link>
      </div>
    </header>
  );
}