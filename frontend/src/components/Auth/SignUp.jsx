import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // we create an account on supabase (but just the authentication)
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
        },
      });

      if (error) throw error;

      alert(
        "Cadastro realizado! Por favor, confirme seu e-mail antes de tentar logar.",
      );
      navigate("/");
    } catch (error) {
      alert("Erro no cadastro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="p-8 bg-white shadow-md rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 font-serif">
          Criar Conta WorkXPO
        </h2>

        <input
          name="username"
          placeholder="Nome Completo"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Senha (min. 6 caracteres)"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600 font-sans">
          Já tem uma conta?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
