import Header from "../Header";
import AboutProject from "./AboutProject";
import Hero from "./Hero";
import FeaturedProjects from "./FeaturedProjects";

export default function HomeComponent() {
  return (
    <main>
      <Header />
      
      <div className="home-container">

        <Hero />

        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="md:w-1/2">
            <AboutProject />
          </div>

          <div className="md:w-1/2">
            <FeaturedProjects></FeaturedProjects>
          </div>
        </div>

      </div>
    </main>
  );
}
