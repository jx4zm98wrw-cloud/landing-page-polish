import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProcessTimeline from "@/components/ProcessTimeline";
import Documents from "@/components/Documents";
import Benefits from "@/components/Benefits";
import Awards from "@/components/Awards";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import TrustSignals from "@/components/TrustSignals";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SkipToContent from "@/components/SkipToContent";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SkipToContent />
      <Header />
      <main id="main-content">
        <Hero />
        <TrustSignals />
        <ProcessTimeline />
        <Documents />
        <Benefits />
        <Awards />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
