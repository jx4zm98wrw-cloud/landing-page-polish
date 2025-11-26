import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-medium" : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">ASL LAW</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("hero")} className="text-foreground hover:text-primary transition-colors font-medium">
              Trang chủ
            </button>
            <button onClick={() => scrollToSection("process")} className="text-foreground hover:text-primary transition-colors font-medium">
              Quy trình
            </button>
            <button onClick={() => scrollToSection("team")} className="text-foreground hover:text-primary transition-colors font-medium">
              Đội ngũ
            </button>
            <button onClick={() => scrollToSection("faq")} className="text-foreground hover:text-primary transition-colors font-medium">
              FAQ
            </button>
            <a href="tel:+84914195266">
              <Button variant="default" className="gap-2">
                <Phone className="w-4 h-4" />
                (+84) 914 195 266
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            <button onClick={() => scrollToSection("hero")} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Trang chủ
            </button>
            <button onClick={() => scrollToSection("process")} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Quy trình
            </button>
            <button onClick={() => scrollToSection("team")} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Đội ngũ
            </button>
            <button onClick={() => scrollToSection("faq")} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              FAQ
            </button>
            <a href="tel:+84914195266" className="block">
              <Button variant="default" className="w-full gap-2">
                <Phone className="w-4 h-4" />
                (+84) 914 195 266
              </Button>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
