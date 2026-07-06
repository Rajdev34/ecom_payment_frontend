import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function CtaBanner() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="section-py">
      <div className="container-px mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-ink-900/60 to-ink-900/60 px-6 py-14 text-center sm:px-12 lg:py-20`}
        >
          <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[100px]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              Stop getting dropped. Start getting paid.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-300 text-balance">
              Join 12,000+ high-risk merchants who process with confidence.
              Apply in 5 minutes. Approved in 48–72 hours with complete documents.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#apply" className="btn-primary group">
                Apply now — it is free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#features" className="btn-ghost">
                Explore features
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
