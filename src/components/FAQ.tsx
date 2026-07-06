import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const faqs = [
  {
    q: 'What makes a business "high-risk"?',
    a: 'High-risk classification depends on your industry, chargeback history, average transaction size, and business model. Common high-risk verticals include e-commerce, dropshipping, SaaS, coaching, digital courses, supplements, CBD, and subscription businesses. Traditional processors often reject or drop these merchants due to elevated chargeback ratios or regulatory concerns.',
  },
  {
    q: 'How long does approval take?',
    a: 'Approval typically takes 48–72 hours when all required documents are provided upfront. Incomplete submissions take longer — we cannot begin underwriting until we have everything. Complex cases involving high monthly volume or regulated industries may take 3–5 business days. A dedicated underwriter keeps you updated throughout the process and will reach out immediately if anything is missing.',
  },
  {
    q: 'What are the requirements to get approved?',
    a: 'You must have a registered LLC (or equivalent US business entity) and a US-based signer who is an owner or authorized representative. We also require a business bank account, processing statements (if you have prior processing history), a valid website or storefront, and government-issued ID for the signer. Additional documents may be requested depending on your industry and volume.',
  },
  {
    q: 'What are your rates and fees?',
    a: 'Rates and fees depend on the business and the client. Every account is evaluated individually based on industry, processing volume, risk profile, and other factors. Apply and our team will provide a custom quote tailored to your specific situation.',
  },
  {
    q: 'Do you require a rolling reserve?',
    a: 'Some high-risk verticals require a rolling reserve (typically 5–10% held for 90–180 days) as a condition set by our acquiring bank partners. We work to minimize reserve requirements and negotiate the best terms for your specific business model and processing history.',
  },
  {
    q: 'What happens if my chargeback ratio gets high?',
    a: 'We proactively monitor chargeback ratios and alert you before they reach critical thresholds. Our chargeback defense tools include automated evidence generation, dispute response templates, and fraud screening to prevent disputes before they happen. We help you stay below card network limits (typically 1% of transactions or 1.8% of dollar volume).',
  },
  {
    q: 'Can I switch from my current processor?',
    a: 'Yes. We make switching seamless — we handle the application, integration, and migration. You can run your current processor in parallel during the transition to avoid any downtime. Most merchants are fully switched within 3–5 days of approval.',
  },
  {
    q: 'What platforms do you integrate with?',
    a: 'We offer native plugins for Shopify, WooCommerce, ClickFunnels, Kajabi, Teachable, SamCart, and BigCommerce. We also provide a REST API, hosted checkout pages, and drop-in components for custom integrations. Most merchants go live within hours of approval.',
  },
  {
    q: 'Do you support international merchants?',
    a: 'Yes. We support merchants in 150+ countries and accept payments in 135+ currencies. We have local acquiring relationships in the US, EU, UK, Canada, and Australia. International merchants should contact us to confirm availability in their specific region.',
  },
];

function FaqItem({ faq, isOpen, onToggle }: { faq: (typeof faqs)[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="card overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-white">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-ink-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-brand-400' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-ink-400">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-py relative">
      <div className="container-px mx-auto max-w-3xl">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center`}>
          <span className="section-eyebrow">FAQ</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Questions, answered
          </h2>
          <p className="mt-4 text-lg text-ink-300 text-balance">
            Everything you need to know about high-risk payment processing with Helix Pay.
          </p>
        </div>

        <div className={`mt-12 space-y-3 reveal ${visible ? 'is-visible' : ''}`}>
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
