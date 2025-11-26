import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Documents from "@/components/Documents";
import Benefits from "@/components/Benefits";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Process />
        <Documents />
        <Benefits />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
