import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";

function Home({ t }) {
  return (
    <>
      <Hero t={t} />
      <About />
      <Contact />
    </>
  );
}

export default Home;
