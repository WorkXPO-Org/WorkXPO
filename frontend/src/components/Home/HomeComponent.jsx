import Header from "../Header";
import AboutProject from "./AboutProject";
import Hero from "./Hero";

export default function Home() {
  return (
    <>
      <Header />
      <div className="home-container">
        <Hero />
        <AboutProject />
      </div>
    </>
  );
}

// @layer card-container {

//   .about-container {
//     @apply;
//   }
// }
