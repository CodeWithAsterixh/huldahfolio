import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { PageContainer } from "./Section";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on navigation or if screen resized
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent py-4"
        }`}
    >
      <PageContainer>
        <div className="py-4 flex justify-between items-center relative">
          <Link to="/" className="text-2xl font-serif tracking-tighter z-50">Huldah</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-12 text-[10px] font-sans text-white/50 uppercase tracking-[0.25em] font-bold">
            <Link to="/#about" className="hover:text-white transition-colors link-underline">About</Link>
            <Link to="/#projects" className="hover:text-white transition-colors link-underline">Projects</Link>
            <Link to="/#skills" className="hover:text-white transition-colors link-underline">Expertise</Link>
            <Link to="/contact" className="hover:text-white transition-colors text-white link-underline">Contact</Link>
          </nav>

          {/* Hamburger Menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-50 flex flex-col gap-1.5 p-2"
            aria-label="Toggle Navigation"
          >
            <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </PageContainer>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed h-dvh inset-0 bg-[#050505] z-40 transition-all duration-500 ease-in-out flex flex-col items-center justify-center px-12 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Background Watermark in Menu */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 select-none pointer-events-none opacity-[0.02]">
          <span className="text-[120vw] font-serif font-black uppercase tracking-tighter text-white">
            Menu
          </span>
        </div>

        <div className="flex flex-col items-center gap-12 relative z-10 w-full">
          <div className="w-12 h-[1px] bg-white/20" />
          <nav className="flex flex-col gap-8 items-center text-center">
            {["About", "Projects", "Skills", "Contact"].map((item, idx) => (
              <Link
                key={item}
                to={item === "Contact" ? "/contact" : `/#${item.toLowerCase()}`}
                className={`text-5xl md:text-7xl font-serif text-white hover:text-white/60 transition-all duration-500 transform ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="w-12 h-[1px] bg-white/20 mt-4" />
        </div>
      </div>
    </header>
  );
}
