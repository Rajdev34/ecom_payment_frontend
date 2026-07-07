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
  owner1_ssn_itin: '123-45-6789',
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

  it('fails validation when name contains numbers', () => {
    const payload = { ...validBasePayload, contact_name: 'John Doe 123' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const nameError = result.error.issues.find((issue) => issue.path.includes('contact_name'));
      expect(nameError?.message).toBe('Contact name must not contain numbers');
    }
  });

  it('fails validation when optional owner 2 name contains numbers', () => {
    const payload = { ...validBasePayload, owner2_legal_name: 'Jane Smith 9' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const nameError = result.error.issues.find((issue) => issue.path.includes('owner2_legal_name'));
      expect(nameError?.message).toBe('Owner 2 legal name must not contain numbers');
    }
  });

  it('successfully cleans and coerces dollar/comma strings into numbers', () => {
    const payload = {
      ...validBasePayload,
      avg_monthly_volume: '$10,500.50',
      avg_transaction_size: '$100',
      high_ticket_size: '$500',
    };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.avg_monthly_volume).toBe(10500.50);
      expect(result.data.avg_transaction_size).toBe(100);
      expect(result.data.high_ticket_size).toBe(500);
    }
  });

  it('fails validation when numeric fields are non-numeric strings', () => {
    const payload = { ...validBasePayload, avg_monthly_volume: 'five thousand' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const volumeError = result.error.issues.find((issue) => issue.path.includes('avg_monthly_volume'));
      expect(volumeError?.message).toBe('Average monthly processing volume must be a number');
    }
  });

  it('successfully cleans and coerces phone numbers to numbers', () => {
    const payload = {
      ...validBasePayload,
      phone: '+1 (123) 456-7890',
      owner1_personal_phone: '098-765-4321',
    };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe(11234567890);
      expect(result.data.owner1_personal_phone).toBe(987654321);
    }
  });

  it('fails validation when phone numbers contain letters', () => {
    const payload = { ...validBasePayload, phone: '123-abc-7890' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const phoneError = result.error.issues.find((issue) => issue.path.includes('phone'));
      expect(phoneError?.message).toBe('Phone number must be a number');
    }
  });

  it('successfully cleans and coerces optional existing processing duration to a number if provided', () => {
    const payload = { ...validBasePayload, existing_processing: '24 months' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.existing_processing).toBe(24);
    }
  });

  it('fails validation when optional existing processing duration has non-numeric text', () => {
    const payload = { ...validBasePayload, existing_processing: 'two years' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const procError = result.error.issues.find((issue) => issue.path.includes('existing_processing'));
      expect(procError?.message).toBe('Existing processing duration must be a number');
    }
  });

  it('successfully cleans and coerces optional Owner 2 ownership percentage to a number if provided', () => {
    const payload = { ...validBasePayload, owner2_ownership_pct: '25.5%' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.owner2_ownership_pct).toBe(25.5);
    }
  });

  it('fails validation when optional Owner 2 ownership percentage has non-numeric text', () => {
    const payload = { ...validBasePayload, owner2_ownership_pct: 'twenty five percent' };
    const result = applicationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const pctError = result.error.issues.find((issue) => issue.path.includes('owner2_ownership_pct'));
      expect(pctError?.message).toBe('Owner 2 ownership percentage must be a number');
    }
  });

  it('fails validation when tax ID or SSN contains invalid characters like letters', () => {
    const payloadTaxInvalid = { ...validBasePayload, federal_tax_id: '12-abc4567' };
    const resultTax = applicationSchema.safeParse(payloadTaxInvalid);
    expect(resultTax.success).toBe(false);
    if (!resultTax.success) {
      const taxError = resultTax.error.issues.find((issue) => issue.path.includes('federal_tax_id'));
      expect(taxError?.message).toBe('Federal tax ID must only contain numbers and dashes');
    }

    const payloadSsnInvalid = { ...validBasePayload, owner1_ssn_itin: 'XXX-XX-XXXY' };
    const resultSsn = applicationSchema.safeParse(payloadSsnInvalid);
    expect(resultSsn.success).toBe(false);
    if (!resultSsn.success) {
      const ssnError = resultSsn.error.issues.find((issue) => issue.path.includes('owner1_ssn_itin'));
      expect(ssnError?.message).toBe('SSN or ITIN must only contain numbers and dashes');
    }
  });
});
