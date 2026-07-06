import { FileText, ShieldCheck, Rocket, TrendingUp } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const steps = [
  {
    icon: FileText,
    step: '01',
    title: 'Submit your application',
    description: 'Fill out a 5-minute online application with your business details, processing history, and industry vertical. No paperwork, no faxing.',
  },
  {
    icon: ShieldCheck,
    step: '02',
    title: 'Underwriting & approval',
    description: 'Our high-risk underwriting team reviews your application. Approval typically takes 48–72 hours when all documents are provided. Incomplete submissions take longer. We match you with the right acquiring bank for your vertical.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Integrate & launch',
    description: 'Connect your storefront or platform with our plugins or API. Test in sandbox, then flip the switch to live. Go live the same day you are approved.',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Scale with confidence',
    description: 'Your dedicated account manager monitors your account, helps optimize approval rates, and scales your processing limits as you grow.',
  },
];

export default function Process() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="process" className="section-py relative">
      <div className="container-px mx-auto max-w-7xl">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}>
          <span className="section-eyebrow">How It Works</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            From application to first payment in days
          </h2>
          <p className="mt-4 text-lg text-ink-300 text-balance">
            No 6-week underwriting cycles. No cryptic rejections. A clear, fast path to accepting payments.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className={`relative reveal ${visible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[3.25rem] top-12 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-ink-700 to-transparent lg:block" />
                )}

                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-500/20 bg-ink-900/80 shadow-lg shadow-brand-500/5">
                  <Icon className="h-7 w-7 text-brand-400" strokeWidth={1.8} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-ink-950">
                    {step.step}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
