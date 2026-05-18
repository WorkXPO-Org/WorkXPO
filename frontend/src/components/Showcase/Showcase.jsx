import { useState, useEffect } from 'react';
import api from '../../services/axios'; 
import ProjectCard from '../ProjectCard'; 
import Header from '../Header';

const CATEGORIES = {
  ALL: "Todos",
  TECHNOLOGY: "Tecnologia",
  HEALTH: "Saúde",
  MARKETING: "Marketing",
  LITERATURE: "Literatura",
  INDUSTRY: "Indústria",
  INFRASTRUCTURE: "Infraestrutura"
};

export default function ProjectShowcase() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const url = selectedCategory === "ALL" 
          ? "/projects" 
          : `/projects/category/${selectedCategory}`;
        
        const response = await api.get(url);
        setProjects(response.data);
      } catch (error) {
        console.error("Erro ao carregar vitrine:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCategory]);

  return (
    <>
    <Header />
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-dark mb-8">Projetos</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-secondary p-6 rounded-lg border border-dark/10">
            <h2 className="text-lg font-sans font-bold text-text-main mb-4">Categorias</h2>
            <ul className="space-y-2">
              {/* category sidebar */}
              {Object.keys(CATEGORIES).map(key => (
                <li key={key}>
                  <button
                    onClick={() => setSelectedCategory(key)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedCategory === key 
                        ? "bg-primary text-white" 
                        : "hover:bg-cyan-brighter text-text-slate"
                    }`}
                  >
                    {/* show the value of each key (in portuguese) */}
                    {CATEGORIES[key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1">
          {loading ? (
            <p className="text-center text-text-slate italic">Carregando inovações...</p>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-secondary rounded-lg">
              <p className="text-text-slate">Nenhum projeto encontrado para esta categoria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
    </>
  );
}