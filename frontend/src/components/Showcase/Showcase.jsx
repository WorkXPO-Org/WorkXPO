import { useState, useEffect } from 'react';
import api from '../../services/axios'; 
import ProjectCard from '../ProjectCard'; 
import Header from '../Header';

const CATEGORIES = ["ALL", "TECHNOLOGY", "HEALTH", "EDUCATION", "LITERATURE"];

export default function ProjectShowcase() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // if the user selects all, show all the projects, if not, show only the projects of the specific category
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
        {/* category sidebar*/}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-secondary p-6 rounded-lg border border-dark/10">
            <h2 className="text-lg font-sans font-bold text-text-main mb-4">Categorias</h2>
            <ul className="space-y-2">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedCategory === cat 
                        ? "bg-primary text-white" 
                        : "hover:bg-cyan-brighter text-text-slate"
                    }`}
                  >
                    {cat.charAt(0) + cat.slice(1).toLowerCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* projects */}
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