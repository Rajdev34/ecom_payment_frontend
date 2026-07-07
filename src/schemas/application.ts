import { z } from 'zod';

const industryTypes = ['ecommerce', 'dropshipping', 'saas', 'coaching', 'courses', 'supplements', 'other'] as const;

export const applicationSchema = z.object({
  business_name: z.string().trim().min(1, 'Business name is required'),
  contact_name: z.string().trim().min(1, 'Contact name is required'),
  email: z.string().trim().email('Invalid email address'),
  phone: z.string().trim().min(1, 'Phone number is required'),
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
  federal_tax_id: z.string().trim().min(1, 'Federal tax ID (EIN) is required'),
  business_start_date: z.string().trim().min(1, 'Business start date is required'),
  
  has_llc: z.boolean().default(false),
  has_us_signer: z.boolean().default(false),
  
  owner1_ssn_itin: z.string().trim().min(1, 'SSN or ITIN is required'),
  owner1_personal_phone: z.string().trim().min(1, 'Personal phone number is required'),
  
  owner2_legal_name: z.string().trim().nullable().optional().or(z.literal('')),
  owner2_ownership_pct: z.string().trim().nullable().optional().or(z.literal('')),
  owner2_job_title: z.string().trim().nullable().optional().or(z.literal('')),
  owner2_date_of_birth: z.string().trim().nullable().optional().or(z.literal('')),
  owner2_address: z.string().trim().nullable().optional().or(z.literal('')),
  
  payment_method_in_person: z.boolean().default(false),
  payment_method_online: z.boolean().default(false),
  payment_method_phone_invoice: z.boolean().default(false),
  
  avg_monthly_volume: z.string().trim().min(1, 'Average monthly processing volume is required'),
  avg_transaction_size: z.string().trim().min(1, 'Average transaction size is required'),
  high_ticket_size: z.string().trim().min(1, 'High ticket transaction size is required'),
  existing_processing: z.string().trim().nullable().optional().or(z.literal('')),
  previous_processor: z.string().trim().nullable().optional().or(z.literal('')),
  
  description: z.string().trim().nullable().optional().or(z.literal('')),
});
