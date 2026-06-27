import { useEffect, useRef, useState } from 'react';

interface NavbarProps {
  scrollTo: (target: string, options?: { offset?: number; duration?: number }) => void;
}

export default function Navbar({ scrollTo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close menu on click
    scrollTo(target, { offset: -80 });
  };

  return (
    <nav ref={navRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          Regal By Aastha
        </a>

        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
          <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a>
          <a href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')}>Portfolio</a>
          <a href="#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')}>Reviews</a>
          <a
            href="#contact"
            className="btn-primary navbar-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Book Now
          </a>
        </div>

        <button 
          className={`navbar-mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
