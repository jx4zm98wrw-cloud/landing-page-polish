import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
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
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-lg hover:bg-secondary/50 min-h-[44px]"
              aria-label="Go to home section"
            >
              Trang chủ
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-lg hover:bg-secondary/50 min-h-[44px]"
              aria-label="Go to process section"
            >
              Quy trình
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-lg hover:bg-secondary/50 min-h-[44px]"
              aria-label="Go to team section"
            >
              Đội ngũ
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-lg hover:bg-secondary/50 min-h-[44px]"
              aria-label="Go to FAQ section"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-lg hover:bg-secondary/50 min-h-[44px]"
              aria-label="Go to contact section"
            >
              Liên hệ
            </button>
            <button
              onClick={() => scrollToSection("awards")}
              className="text-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-lg hover:bg-secondary/50 min-h-[44px]"
              aria-label="Go to awards section"
            >
              Giải thưởng
            </button>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a href="tel:+84914195266">
                <Button variant="default" className="gap-2 min-h-[44px]">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">(+84) 914 195 266</span>
                  <span className="sm:hidden">Gọi ngay</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-lg hover:bg-secondary transition-colors active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden py-4 space-y-2 animate-fade-in"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full text-left px-4 py-3 rounded-lg hover:bg-secondary transition-colors min-h-[44px] text-base font-medium"
              role="menuitem"
              aria-label="Navigate to home section"
            >
              Trang chủ
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="block w-full text-left px-4 py-3 rounded-lg hover:bg-secondary transition-colors min-h-[44px] text-base font-medium"
              role="menuitem"
              aria-label="Navigate to process section"
            >
              Quy trình
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="block w-full text-left px-4 py-3 rounded-lg hover:bg-secondary transition-colors min-h-[44px] text-base font-medium"
              role="menuitem"
              aria-label="Navigate to team section"
            >
              Đội ngũ
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="block w-full text-left px-4 py-3 rounded-lg hover:bg-secondary transition-colors min-h-[44px] text-base font-medium"
              role="menuitem"
              aria-label="Navigate to FAQ section"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-3 rounded-lg hover:bg-secondary transition-colors min-h-[44px] text-base font-medium"
              role="menuitem"
              aria-label="Navigate to contact section"
            >
              Liên hệ
            </button>
            <button
              onClick={() => scrollToSection("awards")}
              className="block w-full text-left px-4 py-3 rounded-lg hover:bg-secondary transition-colors min-h-[44px] text-base font-medium"
              role="menuitem"
              aria-label="Navigate to awards section"
            >
              Giải thưởng
            </button>
            <a
              href="tel:+84914195266"
              className="block mt-2"
              role="menuitem"
              aria-label="Call ASL LAW at 0914195266"
            >
              <Button variant="default" className="w-full gap-2 min-h-[44px] text-base">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>(+84) 914 195 266</span>
              </Button>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
