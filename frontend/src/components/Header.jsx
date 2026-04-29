export default function Header() {
  const MENU_ITEMS = [
    { label: "Home", path: "/" },
    { label: "Vitrine de Projetos", path: "/projects" },
    { label: "Sobre", path: "/abbout" },
  ];

  return (
    <header className="bg-primary p-5 border-dark/20">
      <nav>
        <ul className="flex flex-row justify-center gap-10 text-xl font-bold text-text-main">
          {MENU_ITEMS.map((item) => (
            <li key={item}>
              <a href={item.path} className="hover:text-dark transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
