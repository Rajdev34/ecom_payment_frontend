import { useState, useRef } from 'react';
import {
  ArrowRight, CheckCircle2, Loader2, AlertCircle,
  Building2, UserCheck, Info, UploadCloud, FileCheck,
} from 'lucide-react';
// import { supabase } from '../lib/supabase';
import { useReveal } from '../hooks/useReveal';

const industries = [
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'dropshipping', label: 'Dropshipping' },
  { value: 'saas', label: 'SaaS' },
  { value: 'coaching', label: 'Coaching' },
  { value: 'courses', label: 'Course Sellers' },
  { value: 'supplements', label: 'Supplements' },
  { value: 'other', label: 'Other' },
];

const volumes = [
  'Under $10K/month',
  '$10K – $50K/month',
  '$50K – $250K/month',
  '$250K – $500K/month',
  '$500K – $1M/month',
  'Over $1M/month',
];

const requiredDocs = [
  'Certificate of Incorporation or Articles of Organization',
  'SS-4 (EIN Letter from IRS)',
  'Drivers License or Passport for all owners over 25%',
  'Voided Check or Bank Letter (where you would like deposits)',
  'Processing Statements (3–6 most recent months)',
  'Business Bank Statements (3–6 most recent months)',
  'Fulfillment Agreement or 3PL Agreement (if selling physical products)',
  'Recent Invoice from Supplier (if selling physical products)',
  'Certificate of Analysis (if selling supplements, nutraceuticals, CBD or any ingestible product)',
  'Agreements with any third party vendors (Plaid, Radar, Chargeback Management providers)',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const emptyForm = {
  // Business Information
  business_name: '',
  legal_address: '',
  dba_name: '',
  dba_address: '',
  federal_tax_id: '',
  business_start_date: '',
  // Owner 1
  contact_name: '',
  email: '',
  phone: '',
  owner1_ssn_itin: '',
  owner1_personal_phone: '',
  // Owner 2 (optional)
  owner2_legal_name: '',
  owner2_ownership_pct: '',
  owner2_job_title: '',
  owner2_date_of_birth: '',
  owner2_address: '',
  // Processing Details
  website: '',
  country: 'United States',
  industry: '',
  monthly_volume: '',
  // Processing Information
  payment_method_in_person: false,
  payment_method_online: false,
  payment_method_phone_invoice: false,
  avg_monthly_volume: '',
  avg_transaction_size: '',
  high_ticket_size: '',
  existing_processing: '',
  previous_processor: '',
  // Eligibility
  has_llc: false,
  has_us_signer: false,
  // About
  description: '',
};

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="mb-5 border-b border-ink-800 pb-3">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-400">{label}</h3>
    </div>
  );
}

export default function ApplyForm() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ ...emptyForm });
  const [docFile, setDocFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFile = (file: File | null) => {
    setDocFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0] ?? null;
    if (file) handleFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      let documentUrl: string | null = null;

      // 1. Upload files to the Express Node.js Server
      if (docFile) {
        const formData = new FormData();
        formData.append('document', docFile);

        const uploadResponse = await fetch('http://localhost:5000/api/applications/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Failed to upload application files.');
        }

        const uploadResult = await uploadResponse.json();
        documentUrl = uploadResult.path; // Get the generated path from the backend
      }

      // 2. Submit the form application details to the Express Node.js Server
      const payload = {
        business_name: form.business_name,
        legal_address: form.legal_address,
        dba_name: form.dba_name || null,
        dba_address: form.dba_address || null,
        federal_tax_id: form.federal_tax_id,
        business_start_date: form.business_start_date || null,
        contact_name: form.contact_name,
        email: form.email,
        phone: form.phone,
        owner1_ssn_itin: form.owner1_ssn_itin || null,
        owner1_personal_phone: form.owner1_personal_phone || null,
        owner2_legal_name: form.owner2_legal_name || null,
        owner2_ownership_pct: form.owner2_ownership_pct || null,
        owner2_job_title: form.owner2_job_title || null,
        owner2_date_of_birth: form.owner2_date_of_birth || null,
        owner2_address: form.owner2_address || null,
        website: form.website || null,
        country: form.country,
        industry: form.industry,
        monthly_volume: form.monthly_volume,
        payment_method_in_person: form.payment_method_in_person,
        payment_method_online: form.payment_method_online,
        payment_method_phone_invoice: form.payment_method_phone_invoice,
        avg_monthly_volume: form.avg_monthly_volume || null,
        avg_transaction_size: form.avg_transaction_size || null,
        high_ticket_size: form.high_ticket_size || null,
        existing_processing: form.existing_processing || null,
        previous_processor: form.previous_processor || null,
        has_llc: form.has_llc,
        has_us_signer: form.has_us_signer,
        description: form.description || null,
        document_url: documentUrl,
      };

      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <section id="apply" className="section-py relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="container-px mx-auto max-w-2xl">
          <div className="card p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/15 ring-1 ring-brand-500/30">
              <CheckCircle2 className="h-8 w-8 text-brand-400" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-white">Application received!</h3>
            <p className="mt-3 text-ink-300">
              Thank you, {form.contact_name.split(' ')[0] || 'there'}. Our underwriting team will review your
              application and reach out to <span className="font-semibold text-white">{form.email}</span> within
              48–72 hours with next steps. The faster you provide all requested documents, the faster we can approve you.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => {
                  setStatus('idle');
                  setForm({ ...emptyForm });
                  setDocFile(null);
                }}
                className="btn-secondary"
              >
                Submit another application
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="section-py relative overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-500/8 blur-[130px]" />

      <div className="container-px mx-auto max-w-3xl">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center`}>
          <span className="section-eyebrow">Get Started</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Apply for your merchant account
          </h2>
          <p className="mt-4 text-lg text-ink-300 text-balance">
            Takes 5 minutes. No application fee. No commitment. Approval in 48–72 hours when all documents are provided.
          </p>
        </div>

        {/* Eligibility notice */}
        <div className={`mt-8 flex items-start gap-3 rounded-xl border border-accent-500/20 bg-accent-500/5 px-5 py-4 reveal ${visible ? 'is-visible' : ''}`}>
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
          <div className="text-sm text-ink-300">
            <span className="font-semibold text-white">Eligibility requirements:</span> You must have a
            registered LLC (or equivalent US business entity) and a US-based signer who is an owner or
            authorized representative. Please confirm both below before submitting.
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`mt-6 card p-6 sm:p-8 reveal ${visible ? 'is-visible' : ''}`}
        >
          {status === 'error' && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
              <div>
                <p className="text-sm font-medium text-red-300">Submission failed</p>
                <p className="mt-0.5 text-sm text-red-400/80">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* ── Business Information ── */}
          <SectionHeading label="Business Information" />
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label-field" htmlFor="business_name">
                Legal business name <span className="text-brand-400">*</span>
              </label>
              <input
                id="business_name"
                type="text"
                required
                value={form.business_name}
                onChange={(e) => update('business_name', e.target.value)}
                className="input-field"
                placeholder="Acme Inc."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label-field" htmlFor="legal_address">
                Legal address <span className="text-brand-400">*</span>
              </label>
              <input
                id="legal_address"
                type="text"
                required
                value={form.legal_address}
                onChange={(e) => update('legal_address', e.target.value)}
                className="input-field"
                placeholder="123 Main St, Suite 100, New York, NY 10001"
              />
            </div>

            <div>
              <label className="label-field" htmlFor="dba_name">
                DBA name <span className="text-brand-400">*</span>
              </label>
              <input
                id="dba_name"
                type="text"
                required
                value={form.dba_name}
                onChange={(e) => update('dba_name', e.target.value)}
                className="input-field"
                placeholder="Acme Store"
              />
            </div>

            <div>
              <label className="label-field" htmlFor="dba_address">
                DBA address <span className="text-ink-400 text-xs">(if different from legal)</span>
              </label>
              <input
                id="dba_address"
                type="text"
                value={form.dba_address}
                onChange={(e) => update('dba_address', e.target.value)}
                className="input-field"
                placeholder="456 Commerce Ave, Austin, TX 78701"
              />
            </div>

            <div>
              <label className="label-field" htmlFor="federal_tax_id">
                Federal Tax ID (EIN Number) <span className="text-brand-400">*</span>
              </label>
              <input
                id="federal_tax_id"
                type="text"
                required
                value={form.federal_tax_id}
                onChange={(e) => update('federal_tax_id', e.target.value)}
                className="input-field"
                placeholder="12-3456789"
              />
            </div>

            <div>
              <label className="label-field" htmlFor="business_start_date">
                Business start date <span className="text-brand-400">*</span>
              </label>
              <input
                id="business_start_date"
                type="date"
                required
                value={form.business_start_date}
                onChange={(e) => update('business_start_date', e.target.value)}
                className="input-field [color-scheme:light] [&::-webkit-calendar-picker-indicator]:[filter:invert(1)] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-datetime-edit]:text-white [&::-webkit-datetime-edit-fields-wrapper]:text-white"
              />
            </div>
          </div>

          {/* ── Owner 1 ── */}
          <div className="mt-8">
            <SectionHeading label="Owner 1" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field" htmlFor="contact_name">
                  Legal name <span className="text-brand-400">*</span>
                </label>
                <input
                  id="contact_name"
                  type="text"
                  required
                  value={form.contact_name}
                  onChange={(e) => update('contact_name', e.target.value)}
                  className="input-field"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="label-field" htmlFor="email">
                  Email <span className="text-brand-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="input-field"
                  placeholder="jane@acme.com"
                />
              </div>

              <div>
                <label className="label-field" htmlFor="phone">
                  Business phone <span className="text-brand-400">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="label-field" htmlFor="owner1_personal_phone">
                  Personal phone number <span className="text-brand-400">*</span>
                </label>
                <input
                  id="owner1_personal_phone"
                  type="tel"
                  required
                  value={form.owner1_personal_phone}
                  onChange={(e) => update('owner1_personal_phone', e.target.value)}
                  className="input-field"
                  placeholder="+1 (555) 987-6543"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="label-field" htmlFor="owner1_ssn_itin">
                  SSN or ITIN <span className="text-brand-400">*</span>
                </label>
                <input
                  id="owner1_ssn_itin"
                  type="text"
                  required
                  value={form.owner1_ssn_itin}
                  onChange={(e) => update('owner1_ssn_itin', e.target.value)}
                  className="input-field"
                  placeholder="XXX-XX-XXXX"
                />
              </div>
            </div>
          </div>

          {/* ── Owner 2 ── */}
          <div className="mt-8">
            <SectionHeading label="Owner 2 (Optional)" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field" htmlFor="owner2_legal_name">
                  Legal name
                </label>
                <input
                  id="owner2_legal_name"
                  type="text"
                  value={form.owner2_legal_name}
                  onChange={(e) => update('owner2_legal_name', e.target.value)}
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="label-field" htmlFor="owner2_ownership_pct">
                  Ownership %
                </label>
                <input
                  id="owner2_ownership_pct"
                  type="text"
                  value={form.owner2_ownership_pct}
                  onChange={(e) => update('owner2_ownership_pct', e.target.value)}
                  className="input-field"
                  placeholder="25%"
                />
              </div>

              <div>
                <label className="label-field" htmlFor="owner2_job_title">
                  Job title
                </label>
                <input
                  id="owner2_job_title"
                  type="text"
                  value={form.owner2_job_title}
                  onChange={(e) => update('owner2_job_title', e.target.value)}
                  className="input-field"
                  placeholder="COO"
                />
              </div>

              <div>
                <label className="label-field" htmlFor="owner2_date_of_birth">
                  Date of birth
                </label>
                <input
                  id="owner2_date_of_birth"
                  type="date"
                  value={form.owner2_date_of_birth}
                  onChange={(e) => update('owner2_date_of_birth', e.target.value)}
                  className="input-field [color-scheme:light] [&::-webkit-calendar-picker-indicator]:[filter:invert(1)] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-datetime-edit]:text-white [&::-webkit-datetime-edit-fields-wrapper]:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="label-field" htmlFor="owner2_address">
                  Address
                </label>
                <input
                  id="owner2_address"
                  type="text"
                  value={form.owner2_address}
                  onChange={(e) => update('owner2_address', e.target.value)}
                  className="input-field"
                  placeholder="789 Elm St, Chicago, IL 60601"
                />
              </div>
            </div>
          </div>

          {/* ── Processing Details ── */}
          <div className="mt-8">
            <SectionHeading label="Processing Details" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field" htmlFor="industry">
                  Industry <span className="text-brand-400">*</span>
                </label>
                <select
                  id="industry"
                  required
                  value={form.industry}
                  onChange={(e) => update('industry', e.target.value)}
                  className="input-field"
                >
                  <option value="" className="bg-ink-950 text-ink-400">Select your industry</option>
                  {industries.map((ind) => (
                    <option key={ind.value} value={ind.value} className="bg-ink-950 text-white">{ind.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-field" htmlFor="monthly_volume">
                  Monthly volume range <span className="text-brand-400">*</span>
                </label>
                <select
                  id="monthly_volume"
                  required
                  value={form.monthly_volume}
                  onChange={(e) => update('monthly_volume', e.target.value)}
                  className="input-field"
                >
                  <option value="" className="bg-ink-950 text-ink-400">Select your volume range</option>
                  {volumes.map((vol) => (
                    <option key={vol} value={vol} className="bg-ink-950 text-white">{vol}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-field" htmlFor="website">
                  Website
                </label>
                <input
                  id="website"
                  type="url"
                  value={form.website}
                  onChange={(e) => update('website', e.target.value)}
                  className="input-field"
                  placeholder="https://acme.com"
                />
              </div>

              <div>
                <label className="label-field" htmlFor="country">
                  Business country <span className="text-brand-400">*</span>
                </label>
                <input
                  id="country"
                  type="text"
                  required
                  value={form.country}
                  onChange={(e) => update('country', e.target.value)}
                  className="input-field"
                  placeholder="United States"
                />
              </div>
            </div>
          </div>

          {/* ── Processing Information ── */}
          <div className="mt-8">
            <SectionHeading label="Processing Information" />

            {/* Payment methods */}
            <p className="label-field mb-3">Desired method(s) of accepting payments</p>
            <div className="mb-5 flex flex-col gap-3">
              {(
                [
                  { key: 'payment_method_in_person', label: 'In Person' },
                  { key: 'payment_method_online', label: 'Online' },
                  { key: 'payment_method_phone_invoice', label: 'Over the Phone / Invoice' },
                ] as { key: keyof typeof emptyForm; label: string }[]
              ).map(({ key, label }) => (
                <label key={key} className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form[key] as boolean}
                    onChange={(e) => update(key, e.target.checked)}
                    className="h-5 w-5 accent-brand-500"
                  />
                  <span className="text-sm text-ink-200">{label}</span>
                </label>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field" htmlFor="avg_monthly_volume">
                  Average monthly processing volume <span className="text-brand-400">*</span>
                </label>
                <input
                  id="avg_monthly_volume"
                  type="text"
                  required
                  value={form.avg_monthly_volume}
                  onChange={(e) => update('avg_monthly_volume', e.target.value)}
                  className="input-field"
                  placeholder="$50,000"
                />
              </div>

              <div>
                <label className="label-field" htmlFor="avg_transaction_size">
                  Average transaction size <span className="text-brand-400">*</span>
                </label>
                <input
                  id="avg_transaction_size"
                  type="text"
                  required
                  value={form.avg_transaction_size}
                  onChange={(e) => update('avg_transaction_size', e.target.value)}
                  className="input-field"
                  placeholder="$150"
                />
              </div>

              <div>
                <label className="label-field" htmlFor="high_ticket_size">
                  High ticket transaction size <span className="text-brand-400">*</span>
                </label>
                <input
                  id="high_ticket_size"
                  type="text"
                  required
                  value={form.high_ticket_size}
                  onChange={(e) => update('high_ticket_size', e.target.value)}
                  className="input-field"
                  placeholder="$1,000"
                />
              </div>

              <div>
                <label className="label-field" htmlFor="previous_processor">
                  Previous processor name
                </label>
                <input
                  id="previous_processor"
                  type="text"
                  value={form.previous_processor}
                  onChange={(e) => update('previous_processor', e.target.value)}
                  className="input-field"
                  placeholder="Stripe, Square, etc."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="label-field" htmlFor="existing_processing">
                  Do you have payment processing already? If yes, how long?
                </label>
                <input
                  id="existing_processing"
                  type="text"
                  value={form.existing_processing}
                  onChange={(e) => update('existing_processing', e.target.value)}
                  className="input-field"
                  placeholder="Yes, 2 years with Stripe"
                />
              </div>
            </div>
          </div>

          {/* ── Eligibility ── */}
          <div className="mt-8">
            <SectionHeading label="Eligibility" />
            <div className="grid gap-4 sm:grid-cols-2">
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-200 ${
                  form.has_llc
                    ? 'border-brand-500/40 bg-brand-500/10'
                    : 'border-ink-700 bg-ink-900/40 hover:border-ink-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.has_llc}
                  onChange={(e) => update('has_llc', e.target.checked)}
                  className="mt-0.5 h-5 w-5 accent-brand-500"
                />
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Building2 className="h-4 w-4 text-brand-400" />
                    Registered LLC or US entity
                  </div>
                  <p className="mt-1 text-xs text-ink-400">
                    My business is a registered LLC, corporation, or equivalent US business entity.
                  </p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-200 ${
                  form.has_us_signer
                    ? 'border-brand-500/40 bg-brand-500/10'
                    : 'border-ink-700 bg-ink-900/40 hover:border-ink-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.has_us_signer}
                  onChange={(e) => update('has_us_signer', e.target.checked)}
                  className="mt-0.5 h-5 w-5 accent-brand-500"
                />
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <UserCheck className="h-4 w-4 text-brand-400" />
                    US-based signer
                  </div>
                  <p className="mt-1 text-xs text-ink-400">
                    A US-based owner or authorized representative will sign the merchant agreement.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* ── About Your Business ── */}
          <div className="mt-8">
            <SectionHeading label="About Your Business" />
            <textarea
              id="description"
              rows={4}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              className="input-field resize-none"
              placeholder="What do you sell? How do you accept payments today? Any processing history or current processor?"
            />
          </div>

          {/* ── File Upload ── */}
          <div className="mt-8">
            <SectionHeading label="File Upload" />

            <p className="mb-4 text-sm text-ink-300">
              Please submit documents in a single zip file with documents titled correctly.
            </p>

            <div className="mb-5 rounded-xl border border-ink-700 bg-ink-900/40 p-5">
              <p className="mb-3 text-sm font-semibold text-white">Required Documents:</p>
              <ol className="space-y-2">
                {requiredDocs.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-300">
                    <span className="mt-px min-w-[1.25rem] font-medium text-brand-400">{i + 1}.</span>
                    {doc}
                  </li>
                ))}
              </ol>
            </div>

            {/* Drop zone */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-all duration-200 ${
                isDragging
                  ? 'border-brand-400 bg-brand-500/10'
                  : docFile
                  ? 'border-brand-500/50 bg-brand-500/5'
                  : 'border-ink-700 hover:border-ink-500 hover:bg-ink-800/40'
              }`}
            >
              {docFile ? (
                <>
                  <FileCheck className="h-8 w-8 text-brand-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">{docFile.name}</p>
                    <p className="mt-0.5 text-xs text-ink-400">
                      {(docFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setDocFile(null); }}
                    className="text-xs text-ink-400 underline underline-offset-2 hover:text-white"
                  >
                    Remove file
                  </button>
                </>
              ) : (
                <>
                  <UploadCloud className="h-8 w-8 text-ink-500" />
                  <div>
                    <p className="text-sm font-semibold text-white">Click to choose a file or drag here</p>
                    <p className="mt-0.5 text-xs text-ink-500">ZIP file, up to 50 MB</p>
                  </div>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".zip,application/zip,application/x-zip-compressed"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary group mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit pre-application
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-ink-500">
            By submitting, you agree to our Terms of Service and Privacy Policy.
            Your information is encrypted and never shared with third parties.
          </p>
        </form>
      </div>
    </section>
  );
}
