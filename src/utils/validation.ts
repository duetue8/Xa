import { z } from 'zod';

// Phone number regex for Canadian format
const PHONE_REGEX = /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;

// Canadian postal code regex for K1A 0A6 format
const POSTAL_CODE_REGEX = /^[A-Z]\d[A-Z]\s\d[A-Z]\d$/;

// Account number regex (digits only)
const ACCOUNT_REGEX = /^\d+$/;

// SIN last 4 digits regex
const SIN_LAST_FOUR_REGEX = /^\d{4}$/;

// Normalize Canadian postal code to K1A 0A6 format
const normalizePostalCode = (postalCode: string): string => {
  // Remove all spaces and convert to uppercase
  const cleaned = postalCode.replace(/\s/g, '').toUpperCase();
  
  // Add space after third character: K1A0A6 -> K1A 0A6
  if (cleaned.length === 6) {
    return cleaned.slice(0, 3) + ' ' + cleaned.slice(3);
  }
  
  return postalCode;
};

// Validation schemas
export const applicationSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email format').transform(val => val.toLowerCase()),
  phoneNumber: z.string()
    .regex(PHONE_REGEX, 'Invalid phone number format')
    .transform(val => val.replace(/\D/g, '')),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'Province is required'),
  zipCode: z.string()
    .transform(normalizePostalCode)
    .refine(val => POSTAL_CODE_REGEX.test(val), {
      message: 'Postal code must be in K1A 0A6 format'
    }),
  bestTimeToCall: z.string().min(1, 'Best time to call is required'),
  loanAmount: z.string().min(1, 'Loan amount is required'),
  monthlyIncome: z.string().min(1, 'Monthly income is required'),
  employmentStatus: z.string().min(1, 'Employment status is required'),
  loanPurpose: z.string().min(1, 'Loan purpose is required'),
  financialInstitution: z.string().min(1, 'Financial institution is required'),
  accountNumber: z.string()
    .min(1, 'Account number is required')
    .regex(ACCOUNT_REGEX, 'Account number must contain only digits'),
  ssnLastFour: z.string().regex(SIN_LAST_FOUR_REGEX, 'SIN must be exactly 4 digits')
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

// Format phone number to standard format
export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumber;
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};

// Validate phone format
export const isValidPhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

// Validate Canadian postal code format
export const isValidZip = (postalCode: string): boolean => {
  const normalized = normalizePostalCode(postalCode);
  return POSTAL_CODE_REGEX.test(normalized);
};

// Validate account number format
export const isValidAccountNumber = (accountNumber: string): boolean => {
  return ACCOUNT_REGEX.test(accountNumber);
};

// Validate SIN last 4 format
export const isValidSsnLastFour = (sin: string): boolean => {
  return SIN_LAST_FOUR_REGEX.test(sin);
}