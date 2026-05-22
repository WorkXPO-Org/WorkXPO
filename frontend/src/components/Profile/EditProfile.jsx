import { useState, useEffect } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    username: "",
    institution: "",
    course: "",
    description: "",
    linkedinUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // we get the data from the user via an authenticated token
  useEffect(() => {
    api
      .get("/user/details")
      .then((res) => {
        setFormData({
          username: res.data.username || "",
          institution: res.data.institution || "",
          course: res.data.course || "",
          description: res.data.description || "",
          linkedinUrl: res.data.linkedinUrl || "",
        });
      })
      .catch((err) => {
        console.error("Erro ao carregar detalhes do perfil:", err);
        alert("Não foi possível carregar seus dados.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // we send the updated value to our patch endpoint
      await api.patch("/user/update", formData);
      alert("Perfil atualizado com sucesso!");
      navigate("/profile/details");
    } catch (error) {
      alert(
        "Erro ao atualizar: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  if (loading) return <div className="p-8">Carregando seus dados...</div>;

  return (
    <>
      <Header />

      <div className="flex flex-col items-center min-h-screen bg-secondary pt-15 p-8">
        <h1 className="font-semibold text-3xl text-dark mb-6">Editar Perfil</h1>
        <form
          onSubmit={handleUpdate}
          className="max-w-2xl bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label className="block text-text-slate mb-1">Nome Completo</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-slate mb-1">Instituição</label>
              <input
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-text-slate mb-1">Curso</label>
              <input
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-slate mb-1">Bio/Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-text-slate mb-1">LinkedIn URL</label>
            <input
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-dark px-6 py-2 rounded font-bold hover:bg-accent transition-colors"
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </div>
    </>
  );
}
