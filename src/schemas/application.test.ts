import { describe, it, expect } from 'vitest';
import { applicationSchema } from './application';

const validBasePayload = {
  business_name: 'Acme Corp',
  contact_name: 'Jane Doe',
  email: 'jane@acme.com',
  phone: '1234567890',
  website: 'https://acme.com',
  country: 'United States',
  industry: 'ecommerce',
  monthly_volume: 'Under $10K/month',
  legal_address: '123 Main St, New York, NY 10001',
  dba_name: 'Acme Store',
  dba_address: '',
  federal_tax_id: '12-3456789',
  business_start_date: '2020-01-01',
  has_llc: true,
  has_us_signer: true,
  owner1_ssn_itin: 'XXX-XX-XXXX',
  owner1_personal_phone: '1234567890',
  owner2_legal_name: '',
  owner2_ownership_pct: '',
  owner2_job_title: '',
  owner2_date_of_birth: '',
  owner2_address: '',
  payment_method_in_person: false,
  payment_method_online: true,
  payment_method_phone_invoice: false,
  avg_monthly_volume: '$5,000',
  avg_transaction_size: '$50',
  high_ticket_size: '$200',
  existing_processing: '',
  previous_processor: '',
  description: 'E-commerce retail store selling custom socks.',
};

describe('applicationSchema Zod validation', () => {
  it('passes validation with a fully valid payload', () => {
    const result = applicationSchema.safeParse(validBasePayload);
    expect(result.success).toBe(true);
  });

  it('fails validation when email format is invalid', () => {
    const payload = { ...validBasePayload, email: 'rajdevfreee' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find((issue) => issue.path.includes('email'));
      expect(emailError?.message).toBe('Invalid email address');
    }
  });

  it('fails validation when a required field is empty', () => {
    const payload = { ...validBasePayload, business_name: '   ' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const businessError = result.error.issues.find((issue) => issue.path.includes('business_name'));
      expect(businessError?.message).toBe('Business name is required');
    }
  });

  it('passes validation when optional fields are empty strings', () => {
    const payload = {
      ...validBasePayload,
      website: '',
      dba_address: '',
      owner2_legal_name: '',
      existing_processing: '',
      previous_processor: '',
    };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('fails validation when an invalid URL is provided for website', () => {
    const payload = { ...validBasePayload, website: 'not-a-valid-url' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const websiteError = result.error.issues.find((issue) => issue.path.includes('website'));
      expect(websiteError?.message).toBe('Invalid website URL');
    }
  });

  it('fails validation when an invalid enum value is provided for industry', () => {
    const payload = { ...validBasePayload, industry: 'cryptocurrency' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const industryError = result.error.issues.find((issue) => issue.path.includes('industry'));
      expect(industryError?.message).toBe('Please select a valid industry');
    }
  });
});
