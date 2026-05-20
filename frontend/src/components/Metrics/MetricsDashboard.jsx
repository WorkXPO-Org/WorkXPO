import { useEffect, useState } from "react";
import axios from "../../services/axios";
import Header from "../Header";

export default function MetricsDashboard() {
  const [icpData, setIcpData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/projects/metrics/icp")
      .then((response) => {
        setIcpData(response.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Erro ao carregar métricas:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10">
        Carregando indicadores de impacto...
      </div>
    );

  return (
    <>
      <Header />

      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-dark mb-2">
          Métrica ICP da WorkXPO (ODS 9)
        </h1>
        <p className="text-gray-600 mb-8">
          Índice de Contato por Projeto (ICP) - Eficiência por Categoria
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(icpData).map(([category, percentage]) => (
          <div key={category} className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-primary">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-cyan-brighter text-dark text-xs font-bold px-3 py-1 rounded-full uppercase">
                {category}
              </span>
              <span className="text-accent font-bold text-lg">{percentage.toFixed(1)}%</span>
            </div>
            
            <h3 className="text-text-main text-xl font-bold mb-4">Taxa de Engajamento</h3>
            
            <div className="w-full bg-secondary rounded-full h-3 mb-4">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-1000" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            
            <p className="text-text-slate text-sm">
              Dos projetos catalogados nesta categoria, <strong>{percentage.toFixed(0)}%</strong> já 
              receberam algum auxílio ou contato.
            </p>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
