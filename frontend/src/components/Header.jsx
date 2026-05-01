import { Link } from "react-router-dom";

export default function Header() {
  const MENU_ITEMS = [
    { label: "Home", path: "/" },
    { label: "Vitrine de Projetos", path: "/projects" },
    { label: "Sobre", path: "/abbout" },
  ];

  return (
    <header className="header">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-text-main">WorkXPO</h1>
      </div>

      <nav className="flex-none">
        <ul className="flex gap-10 text-xl font-bold text-text-main">
          {MENU_ITEMS.map((item) => (
            <li key={item}>
              <Link
                to={item.path}
                className="hover:text-dark transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-1 flex justify-end items-center gap-4">
        <Link
          to="/login"
          className="text-text-main font-semibold hover:underline"
        >
          Entrar
        </Link>

        <Link
          to="/register"
          className="bg-dark text-white px-5 py-2 rounded-full font-bold hover:bg-dark/90 transition-all shadow-sm"
        >
          Criar Conta
        </Link>
      </div>
    </header>
  );
}
