import { z } from 'zod';

const industryTypes = ['ecommerce', 'dropshipping', 'saas', 'coaching', 'courses', 'supplements', 'other'] as const;

export const applicationSchema = z.object({
  business_name: z.string().trim().min(1, 'Business name is required'),
  contact_name: z.string().trim()
    .min(1, 'Contact name is required')
    .regex(/^[^0-9]*$/, 'Contact name must not contain numbers'),
  email: z.string().trim().email('Invalid email address'),
  phone: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') return undefined;
        if (/[a-zA-Z]/.test(trimmed)) return NaN;
        const clean = trimmed.replace(/[^0-9]+/g, '');
        return Number(clean);
      }
      return val;
    },
    z.custom<number>((val) => val !== undefined, { message: 'Phone number is required' })
      .refine((val) => typeof val === 'number' && !isNaN(val), { message: 'Phone number must be a number' })
  ),
  website: z.string().trim().url('Invalid website URL').nullable().optional().or(z.literal('')),
  country: z.string().trim().min(1, 'Country is required'),
  industry: z.enum(industryTypes, {
    message: 'Please select a valid industry',
  }),
  monthly_volume: z.string().trim().min(1, 'Monthly volume is required'),
  
  // Required fields matching the UI inputs
  legal_address: z.string().trim().min(1, 'Legal address is required'),
  dba_name: z.string().trim().min(1, 'DBA name is required'),
  dba_address: z.string().trim().nullable().optional().or(z.literal('')),
  federal_tax_id: z.string().trim()
    .min(1, 'Federal tax ID (EIN) is required')
    .regex(/^[0-9-]+$/, 'Federal tax ID must only contain numbers and dashes'),
  business_start_date: z.string().trim().min(1, 'Business start date is required'),
  
  has_llc: z.boolean().default(false),
  has_us_signer: z.boolean().default(false),
  
  owner1_ssn_itin: z.string().trim()
    .min(1, 'SSN or ITIN is required')
    .regex(/^[0-9-]+$/, 'SSN or ITIN must only contain numbers and dashes'),
  owner1_personal_phone: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') return undefined;
        if (/[a-zA-Z]/.test(trimmed)) return NaN;
        const clean = trimmed.replace(/[^0-9]+/g, '');
        return Number(clean);
      }
      return val;
    },
    z.custom<number>((val) => val !== undefined, { message: 'Personal phone number is required' })
      .refine((val) => typeof val === 'number' && !isNaN(val), { message: 'Personal phone number must be a number' })
  ),
  
  owner2_legal_name: z.string().trim()
    .regex(/^[^0-9]*$/, 'Owner 2 legal name must not contain numbers')
    .nullable().optional().or(z.literal('')),
  owner2_ownership_pct: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') return undefined;
        if (!/[0-9]/.test(trimmed)) return NaN;
        const clean = trimmed.replace(/[^0-9.-]+/g, '');
        return Number(clean);
      }
      return val;
    },
    z.custom<number | undefined>()
      .optional()
      .refine((val) => val === undefined || (typeof val === 'number' && !isNaN(val)), { message: 'Owner 2 ownership percentage must be a number' })
  ),
  owner2_job_title: z.string().trim().nullable().optional().or(z.literal('')),
  owner2_date_of_birth: z.string().trim().nullable().optional().or(z.literal('')),
  owner2_address: z.string().trim().nullable().optional().or(z.literal('')),
  
  payment_method_in_person: z.boolean().default(false),
  payment_method_online: z.boolean().default(false),
  payment_method_phone_invoice: z.boolean().default(false),
  
  avg_monthly_volume: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') return undefined;
        if (!/[0-9]/.test(trimmed)) return NaN;
        const clean = trimmed.replace(/[^0-9.-]+/g, '');
        return Number(clean);
      }
      return val;
    },
    z.custom<number>((val) => val !== undefined, { message: 'Average monthly processing volume is required' })
      .refine((val) => typeof val === 'number' && !isNaN(val), { message: 'Average monthly processing volume must be a number' })
      .refine((val) => typeof val !== 'number' || isNaN(val) || val >= 0.01, { message: 'Average monthly processing volume must be greater than zero' })
  ),
  avg_transaction_size: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') return undefined;
        if (!/[0-9]/.test(trimmed)) return NaN;
        const clean = trimmed.replace(/[^0-9.-]+/g, '');
        return Number(clean);
      }
      return val;
    },
    z.custom<number>((val) => val !== undefined, { message: 'Average transaction size is required' })
      .refine((val) => typeof val === 'number' && !isNaN(val), { message: 'Average transaction size must be a number' })
      .refine((val) => typeof val !== 'number' || isNaN(val) || val >= 0.01, { message: 'Average transaction size must be greater than zero' })
  ),
  high_ticket_size: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') return undefined;
        if (!/[0-9]/.test(trimmed)) return NaN;
        const clean = trimmed.replace(/[^0-9.-]+/g, '');
        return Number(clean);
      }
      return val;
    },
    z.custom<number>((val) => val !== undefined, { message: 'High ticket transaction size is required' })
      .refine((val) => typeof val === 'number' && !isNaN(val), { message: 'High ticket transaction size must be a number' })
      .refine((val) => typeof val !== 'number' || isNaN(val) || val >= 0.01, { message: 'High ticket transaction size must be greater than zero' })
  ),
  existing_processing: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') return undefined;
        if (!/[0-9]/.test(trimmed)) return NaN;
        const clean = trimmed.replace(/[^0-9.-]+/g, '');
        return Number(clean);
      }
      return val;
    },
    z.custom<number | undefined>()
      .optional()
      .refine((val) => val === undefined || (typeof val === 'number' && !isNaN(val)), { message: 'Existing processing duration must be a number' })
  ),
  previous_processor: z.string().trim().nullable().optional().or(z.literal('')),
  
  description: z.string().trim().nullable().optional().or(z.literal('')),
});
