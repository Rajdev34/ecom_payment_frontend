import { ShieldCheck, Twitter, Linkedin, Facebook } from 'lucide-react';

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#process' },
      { label: 'Industries', href: '#industries' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'E-Commerce', href: '#industries' },
      { label: 'Dropshipping', href: '#industries' },
      { label: 'SaaS', href: '#industries' },
      { label: 'Coaching', href: '#industries' },
      { label: 'Course Sellers', href: '#industries' },
      { label: 'Supplements', href: '#industries' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Apply Now', href: '#apply' },
      { label: 'Contact Us', href: '#apply' },
      { label: 'About Us', href: '#top' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'How It Works', href: '#process' },
      { label: 'Chargeback Guide', href: '#faq' },
      { label: 'High-Risk Guide', href: '#faq' },
      { label: 'Get Approved', href: '#apply' },
    ],
  },
];

const socials = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
];

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand column */}
          <div>
            <a 
              href="#top" 
              onClick={(e) => handleLinkClick(e, '#top')}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
                <ShieldCheck className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Ecom<span className="text-brand-400">Payments</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-400">
              High-risk payment processing built for e-commerce, dropshipping, SaaS, coaching,
              course sellers, and supplements. Fast approvals. Fair rates. Real protection.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/50 text-ink-400 transition-all duration-200 hover:border-brand-500/30 hover:text-brand-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white">{col.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="text-sm text-ink-400 transition-colors hover:text-brand-400"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-8 sm:flex-row">
          <p className="text-sm text-ink-500">
            © {new Date().getFullYear()} Ecom Payments Group, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
            <a 
              href="#apply" 
              onClick={(e) => handleLinkClick(e, '#apply')}
              className="transition-colors hover:text-ink-300"
            >
              Terms
            </a>
            <a 
              href="#apply" 
              onClick={(e) => handleLinkClick(e, '#apply')}
              className="transition-colors hover:text-ink-300"
            >
              Privacy
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleLinkClick(e, '#faq')}
              className="transition-colors hover:text-ink-300"
            >
              Cookies
            </a>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
