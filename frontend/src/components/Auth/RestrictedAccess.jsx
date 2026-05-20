import { useNavigate } from "react-router-dom";

export default function RestrictedAccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-10 text-center">
      <div className="bg-secondary border-t-4 border-dark text-text-main p-6 rounded-lg shadow-md max-w-md">
        <h2 className=" text-2xl mb-4">Acesso Restrito</h2>
        <p className="mb-6 font-sans">
          Você precisa estar logado para submeter sua inovação acadêmica ao{" "}
          <strong>Projeto WorkXPO</strong>.
        </p>
        <button
          onClick={() => navigate("/signin")}
          className="bg-dark text-white px-6 py-2 rounded-lg hover:bg-light-dark transition-colors"
        >
          Ir para a página de Login
        </button>
      </div>
    </div>
  );
}
