import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const links = [
  { label: 'Industries', href: 'industries' },
  { label: 'Features', href: 'features' },
  { label: 'How It Works', href: 'process' },
  { label: 'FAQ', href: 'faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Offset for the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink-800/80 bg-ink-950/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        <a 
          href="#top" 
          onClick={(e) => scrollToSection(e, 'top')}
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/20">
            <ShieldCheck className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Helix<span className="text-brand-400">Pay</span>
          </span>
        </a>

        <div className="flex items-center gap-0.5">
          {links.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a 
            href="#apply" 
            onClick={(e) => scrollToSection(e, 'apply')}
            className="btn-ghost hidden sm:inline-flex"
          >
            Sign In
          </a>
          <a 
            href="#apply" 
            onClick={(e) => scrollToSection(e, 'apply')}
            className="btn-primary"
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}

