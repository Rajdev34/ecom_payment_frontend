import { ShieldCheck, CreditCard, Globe, BarChart3, RefreshCw, HeadphonesIcon, Lock, Zap } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const features = [
  {
    icon: ShieldCheck,
    title: 'Chargeback Protection',
    description: 'Automated chargeback alerts, evidence generation, and dispute response tools. We fight chargebacks for you and win up to 78% of cases.',
  },
  {
    icon: CreditCard,
    title: 'All Major Payment Methods',
    description: 'Visa, Mastercard, Amex, Discover, Apple Pay, Google Pay, and BNPL options like Affirm and Klarna. One integration, every method.',
  },
  {
    icon: Globe,
    title: 'Global Processing',
    description: 'Accept payments in 150+ countries and 135+ currencies. Local acquiring in the US, EU, UK, Canada, and Australia with dynamic currency conversion.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Track volume, authorization rates, chargeback ratios, and settlement timing from a single dashboard. Export to QuickBooks or your data warehouse.',
  },
  {
    icon: RefreshCw,
    title: 'Smart Retry & Dunning',
    description: 'AI-powered retry logic recovers failed transactions. Reduce involuntary churn by up to 35% with intelligent payment scheduling.',
  },
  {
    icon: Lock,
    title: 'Bank-Grade Security',
    description: 'PCI DSS Level 1 certified, tokenized vaulting, 3D Secure 2.0, and end-to-end encryption. Your data and your customers are protected.',
  },
  {
    icon: Zap,
    title: 'Fast Integrations',
    description: 'REST API, hosted checkout, drop-in components, and native plugins for Shopify, WooCommerce, ClickFunnels, and more. Go live in hours, not weeks.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Account Manager',
    description: 'Every merchant gets a named account manager who knows your business. No call centers, no ticket queues. Direct phone and email access.',
  },
];

export default function Features() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="features" className="section-py relative overflow-hidden">
      <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-brand-500/5 blur-[120px]" />

      <div className="container-px mx-auto max-w-7xl">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}>
          <span className="section-eyebrow">Why Helix Pay</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Everything you need to get paid
          </h2>
          <p className="mt-4 text-lg text-ink-300 text-balance">
            A full-stack payment platform engineered for high-risk merchants.
            Not just a gateway — a partner that keeps you processing.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`card card-hover group p-6 reveal ${visible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-800/80 ring-1 ring-ink-700 transition-all duration-300 group-hover:bg-brand-500/10 group-hover:ring-brand-500/30">
                  <Icon className="h-5 w-5 text-ink-300 transition-colors group-hover:text-brand-400" strokeWidth={1.8} />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
