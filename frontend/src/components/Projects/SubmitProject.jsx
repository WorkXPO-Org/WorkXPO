import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import Header from "../Header";

export default function SubmitProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // this form is based off the atributtes of our projectDTO
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    statusProject: "",
    statusHelp: "",
    contactLink: "",
    description: "",
    readmeUrl: "",
    imageUrl: "",
    advisor: "",
    institution: "",
  });

  const [emailInput, setEmailInput] = useState("");
  const [studentsGroup, setStudentsGroup] = useState([]);

  // if the user isnt authenticated, we send him to the login page
  const token = localStorage.getItem("supabase_token");
  const isAuthenticated = !!token;
  if (!isAuthenticated) {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // we set the email below the student group list in our project submit page
  const handleAddEmail = (e) => {
    e.preventDefault();
    const trimmedEmail = emailInput.trim();

    if (!trimmedEmail) return;
    if (!trimmedEmail.includes("@")) {
      setErrorMsg("Insira um formato de e-mail válido para o integrante.");
      return;
    }
    if (studentsGroup.includes(trimmedEmail)) {
      setErrorMsg("Este e-mail já foi adicionado ao grupo.");
      return;
    }

    setStudentsGroup([...studentsGroup, trimmedEmail]);
    setEmailInput("");
    setErrorMsg("");
  };

  const handleRemoveEmail = (emailToRemove) => {
    setStudentsGroup(studentsGroup.filter((email) => email !== emailToRemove));
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const sanitizedPayload = {
      ...formData,
      title: capitalizeFirstLetter(formData.title),
      institution: capitalizeFirstLetter(formData.institution),
      advisor: capitalizeFirstLetter(formData.advisor),
      studentsGroup: studentsGroup,
    };

    try {
      await api.post("/projects/create", sanitizedPayload);
      navigate("/projects");
    } catch (err) {
      console.error("Erro ao submeter o projeto:", err);
      const backendMessage =
        err.response?.data?.message || "Erro ao conectar com o servidor.";
      setErrorMsg(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-text-main font-sans">
      <Header />

      <main className="max-w-4xl mx-auto p-6 my-10 bg-cyan-brighter rounded-lg shadow-md border border-dark/10">
        <h2 className="font-bold text-3xl text-dark mb-2">
          Submeter Nova Inovação
        </h2>
        <p className="text-text-slate mb-6 text-sm">
          Preencha a ficha técnica do seu projeto acadêmico para conectá-lo ao
          mercado.
        </p>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md border border-red-200 text-sm font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* required data */}
          <div className="bg-white p-5 rounded-md shadow-sm border border-dark/5 space-y-4">
            <h3 className="text-dark font-semibold border-b pb-2 border-dark/10 text-base">
              Campos Obrigatórios
            </h3>

            <div>
              <label className="block text-xs font-bold text-text-slate uppercase tracking-wider mb-1">
                Título do Projeto *
              </label>
              <input
                type="text"
                name="title"
                required
                minLength={3}
                maxLength={125}
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Sistema de Eficiência Energética Industrial"
                className="w-full p-2.5 rounded border border-dark/20 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-slate uppercase tracking-wider mb-1">
                  Categoria *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-white rounded border border-dark/20 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">Selecione...</option>
                  <option value="HEALTH">Saúde</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="TECHNOLOGY">Tecnologia</option>
                  <option value="LITERATURE">Literatura</option>
                  <option value="INDUSTRY">Industria</option>
                  <option value="INFRASTRUCTURE">Infraestrutura</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-slate uppercase tracking-wider mb-1">
                  Status do Projeto *
                </label>
                <select
                  name="statusProject"
                  required
                  value={formData.statusProject}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-white rounded border border-dark/20 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">Selecione...</option>
                  <option value="IDEA">Ideia</option>
                  <option value="IN_PROGRESS">Em Progresso</option>
                  <option value="PROTOTYPE">Protótipo</option>
                  <option value="FINALIZED">Finalizado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-slate uppercase tracking-wider mb-1">
                  Status de Ajuda *
                </label>
                <select
                  name="statusHelp"
                  required
                  value={formData.statusHelp}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-white rounded border border-dark/20 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">Selecione...</option>
                  <option value="AWAITING">Em Espera</option>
                  <option value="NEGOTIATING">Negociando</option>
                  <option value="RECEIVED">Recebido</option>
                  <option value="NOT_NEEDED">Não é Necessário</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-slate uppercase tracking-wider mb-1">
                E-mail de Contato Principal *
              </label>
              <input
                type="email"
                name="contactLink"
                required
                value={formData.contactLink}
                onChange={handleChange}
                placeholder="Ex: lidersala@universidade.com"
                className="w-full p-2.5 rounded border border-dark/20 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* student group section */}
          <div className="bg-white p-5 rounded-md shadow-sm border border-dark/5 space-y-4">
            <h3 className="text-dark font-semibold border-b pb-2 border-dark/10 text-base">
              Integrantes do Grupo (Opcional)
            </h3>
            <p className="text-xs text-text-slate italic">
              Insira o e-mail dos seus colegas de grupo. O backend validará se
              eles possuem cadastro ativo no sistema.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="aluno@exemplo.com"
                className="flex-1 p-2.5 rounded border border-dark/20 text-sm focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={handleAddEmail}
                className="bg-dark text-text-light px-4 py-2 rounded text-sm font-semibold hover:bg-dark/90 transition-colors"
              >
                Adicionar
              </button>
            </div>

            {/* we set the emails added */}
            <div className="flex flex-wrap gap-2 pt-2">
              {studentsGroup.length === 0 && (
                <span className="text-xs text-text-slate">
                  Nenhum integrante adicionado ao grupo ainda.
                </span>
              )}
              {studentsGroup.map((email) => (
                <div
                  key={email}
                  className="flex items-center gap-1.5 bg-secondary text-dark text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/30"
                >
                  <span>{email}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="text-red-600 font-bold hover:text-red-800 transition-colors ml-1 focus:outline-none"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* optional data */}
          <div className="bg-white p-5 rounded-md shadow-sm border border-dark/5 space-y-4">
            <h3 className="text-dark font-semibold border-b pb-2 border-dark/10 text-base">
              Detalhes Acadêmicos Opcionais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-slate uppercase tracking-wider mb-1">
                  Instituição de Ensino
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Ex: UFRJ, USP, UNIGRANRIO"
                  className="w-full p-2.5 rounded border border-dark/20 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-slate uppercase tracking-wider mb-1">
                  Orientador / Mentor
                </label>
                <input
                  type="text"
                  name="advisor"
                  value={formData.advisor}
                  onChange={handleChange}
                  placeholder="Ex: Prof. Dr. Anderson Silva"
                  className="w-full p-2.5 rounded border border-dark/20 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-slate uppercase tracking-wider mb-1">
                Descrição Longa do Projeto
              </label>
              <textarea
                name="description"
                rows="4"
                minLength={20}
                value={formData.description}
                onChange={handleChange}
                placeholder="Fale detalhadamente sobre o escopo, problemas solucionados e a inovação tecnológica aplicada à ODS 9..."
                className="w-full p-2.5 rounded border border-dark/20 text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-slate uppercase tracking-wider mb-1">
                  Link do Repositório (README URL)
                </label>
                <input
                  type="url"
                  name="readmeUrl"
                  value={formData.readmeUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/usuario/projeto"
                  className="w-full p-2.5 rounded border border-dark/20 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-slate uppercase tracking-wider mb-1">
                  Link da Imagem (Capa do Projeto)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://supabase.storage.co/v1/bucket/capa.png"
                  className="w-full p-2.5 rounded border border-dark/20 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate("/projects")}
              className="px-6 py-2.5 rounded border border-dark/30 text-dark text-sm font-semibold hover:bg-secondary transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-text-main px-8 py-2.5 rounded text-sm font-bold shadow hover:bg-accent transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? "Publicando..." : "Publicar Projeto"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
