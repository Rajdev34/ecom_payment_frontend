import { ShoppingBag, Package, Cloud, GraduationCap, BookOpen, Pill, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const industries = [
  {
    icon: ShoppingBag,
    name: 'E-Commerce',
    tagline: 'Online retail & DTC brands',
    description: 'Accept cards, digital wallets, and BNPL on your storefront. Multi-currency, fraud screening, and recurring billing built in.',
    points: ['Shopify & WooCommerce ready', 'Multi-currency checkout', 'Fraud prevention suite'],
  },
  {
    icon: Package,
    name: 'Dropshipping',
    tagline: 'High-volume, fast fulfillment',
    description: 'We understand dropshipping cash flow. Get rolling reserves that make sense and volume scaling that grows with your store.',
    points: ['Flexible reserve structures', 'High-ticket friendly', 'Volume scaling support'],
  },
  {
    icon: Cloud,
    name: 'SaaS',
    tagline: 'Recurring revenue & subscriptions',
    description: 'Dunning management, proration, and smart retries. Reduce involuntary churn and keep MRR flowing month after month.',
    points: ['Subscription billing engine', 'Automated dunning', 'Usage-based billing'],
  },
  {
    icon: GraduationCap,
    name: 'Coaching',
    tagline: 'High-ticket programs & services',
    description: 'Payment plans, installments, and high-ticket processing. We support coaches, consultants, and service-based businesses.',
    points: ['Installment plans', 'High-ticket limits', 'Client payment portals'],
  },
  {
    icon: BookOpen,
    name: 'Course Sellers',
    tagline: 'Digital products & memberships',
    description: 'Sell courses, memberships, and digital downloads. Instant access automation and secure delivery on every transaction.',
    points: ['Kajabi & Teachable ready', 'Instant access delivery', 'Membership billing'],
  },
  {
    icon: Pill,
    name: 'Supplements',
    tagline: 'Nutraceuticals & wellness',
    description: 'The supplement industry is our specialty. Navigating FDA compliance, auto-ship models, and high chargeback thresholds.',
    points: ['Auto-ship & continuity', 'Chargeback defense', 'Compliance guidance'],
  },
];

export default function Industries() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="industries" className="section-py relative">
      <div className="container-px mx-auto max-w-7xl">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}>
          <span className="section-eyebrow">Industries We Serve</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Built for the verticals others reject
          </h2>
          <p className="mt-4 text-lg text-ink-300 text-balance">
            Traditional processors label these industries "high-risk" and shut them down.
            We built Ecom Payments specifically to keep them running.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className={`card card-hover group p-6 reveal ${visible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-500/20 transition-all duration-300 group-hover:bg-brand-500/20 group-hover:ring-brand-500/40">
                    <Icon className="h-6 w-6 text-brand-400" strokeWidth={1.8} />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-ink-600 transition-all duration-300 group-hover:text-brand-400" />
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-white">{industry.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-400">{industry.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">{industry.description}</p>

                <ul className="mt-5 space-y-2 border-t border-ink-800 pt-4">
                  {industry.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-ink-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
