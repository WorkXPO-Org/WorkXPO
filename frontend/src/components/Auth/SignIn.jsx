import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      if (data?.session) {
        const token = data.session.access_token;
        localStorage.setItem("supabase_token", token);

        const emailFromSupabase = data.user.email;
        const usernameFromSupabase = data.user.user_metadata?.username;

        // sync the authenticated user to the database
        try {
          await api.post(
            "/user/sync",
            {
              email: emailFromSupabase,
              username: usernameFromSupabase,
            },
            {
              // we pass the JWT token on the header to allow the creation of the user
              headers: { Authorization: `Bearer ${token}` },
            },
          );
        } catch (syncError) {
          console.error(
            "Erro na sincronia:",
            syncError.response?.data || syncError.message,
          );
        }

        navigate("/");
      }
    } catch (error) {
      alert("Erro no login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white shadow-md rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          WorkXPO Login
        </h2>

        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Sua senha"
          className="w-full p-2 mb-6 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Cadastre-se aqui
          </Link>
        </p>
      </form>
    </div>
  );
}
