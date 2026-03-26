import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoShape from '../../assets/figma/hero/logo-shape.svg';

const navItems = ['Home', 'Services', 'About', 'Contact'];

export default function HomeHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="max-w-[1076px] mx-auto flex items-center justify-between px-4 xl:px-0 h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="bg-accent-dark w-14 h-14 md:w-[80px] md:h-[80px] flex items-center justify-center overflow-hidden shrink-0">
            <img src={logoShape} alt="" className="w-1/2 h-1/2 object-contain" />
          </div>
          <span className="text-white font-semibold text-sm md:text-base uppercase leading-tight">
            Business<br />Consulting
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className={`font-nav font-medium text-base px-4 py-2 whitespace-nowrap transition-colors ${
                i === 0
                  ? 'text-white font-semibold border-b-2 border-accent'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo('contact')}
          className="hidden md:flex items-center justify-center border-2 border-white text-white font-nav font-medium text-base h-11 px-6 hover:bg-white/10 transition-colors"
        >
          Get in touch
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy/95 backdrop-blur-sm border-t border-white/10">
          <nav className="flex flex-col px-4 py-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="font-nav text-white/80 text-base py-2 text-left hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-2 border-2 border-white text-white font-nav font-medium text-base h-11 hover:bg-white/10 transition-colors"
            >
              Get in touch
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
