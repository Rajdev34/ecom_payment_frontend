import { Star, Quote } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const testimonials = [
  {
    quote:
      'We were dropped by two processors in six months for being "high-risk." Ecom Payments not only approved us in 3 days, but our chargeback ratio dropped 40% with their defense tools. We have not looked back.',
    name: 'Marcus Reid',
    role: 'Founder, ApexSupplements',
    industry: 'Supplements',
    initials: 'MR',
  },
  {
    quote:
      'Processing $400K/month in dropshipping volume and nobody would touch us. Ecom Payments understood the model, gave us a fair reserve structure, and scaled with us. Game changer.',
    name: 'Sarah Chen',
    role: 'CEO, TrendDrop',
    industry: 'Dropshipping',
    initials: 'SC',
  },
  {
    quote:
      'My coaching program does $30K launches. Other processors capped me at $5K per transaction. Ecom Payments approved high-ticket processing on day one. My conversion rate doubled.',
    name: 'David Okonkwo',
    role: 'Business Coach',
    industry: 'Coaching',
    initials: 'DO',
  },
  {
    quote:
      'We sell online courses to 40 countries. Multi-currency checkout, automatic tax handling, and the dunning system recovered $28K in failed payments last quarter alone.',
    name: 'Elena Vasquez',
    role: 'Founder, SkillForge Academy',
    industry: 'Course Sellers',
    initials: 'EV',
  },
  {
    quote:
      'SaaS billing is complex — proration, upgrades, downgrades, usage tiers. Ecom Payments handles all of it. Our involuntary churn dropped from 4.2% to 1.1% in two months.',
    name: 'James Park',
    role: 'CFO, CloudPulse',
    industry: 'SaaS',
    initials: 'JP',
  },
  {
    quote:
      'Our DTC e-commerce brand was stuck on a processor with 6% chargeback fees. Ecom Payments cut that to 1.5% and their fraud screening stopped the synthetic ID attacks. Revenue is up 22%.',
    name: 'Aisha Patel',
    role: 'COO, Lumen Beauty',
    industry: 'E-Commerce',
    initials: 'AP',
  },
];

export default function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="testimonials" className="section-py relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/5 blur-[140px]" />

      <div className="container-px mx-auto max-w-7xl">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}>
          <span className="section-eyebrow">Customer Stories</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Merchants who stopped getting dropped
          </h2>
          <p className="mt-4 text-lg text-ink-300 text-balance">
            Over 12,000 high-risk businesses process with Ecom Payments. Here is what a few of them have to say.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`card card-hover group p-6 reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <Quote className="h-8 w-8 text-brand-500/30" />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink-200">"{t.quote}"</p>

              <div className="mt-5 flex items-center gap-3 border-t border-ink-800 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-ink-950">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-ink-400">{t.role}</div>
                </div>
                <span className="ml-auto rounded-full border border-ink-700 bg-ink-900/60 px-2.5 py-1 text-xs font-medium text-ink-300">
                  {t.industry}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
