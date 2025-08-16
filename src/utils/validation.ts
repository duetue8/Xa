import { z } from 'zod';

// Phone number regex for US format
const PHONE_REGEX = /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;

// ZIP code regex for US format (5 digits or 5+4)
const ZIP_REGEX = /^\d{5}(-\d{4})?$/;

// Account number regex (digits only)
const ACCOUNT_REGEX = /^\d+$/;

// SSN last 4 digits regex
const SSN_LAST_FOUR_REGEX = /^\d{4}$/;

// Validation schemas
export const applicationSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email format').transform(val => val.toLowerCase()),
  phoneNumber: z.string()
    .regex(PHONE_REGEX, 'Invalid phone number format')
    .transform(val => val.replace(/\D/g, '')),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'State must be a 2-letter code'),
  zipCode: z.string().regex(ZIP_REGEX, 'Invalid ZIP code format'),
  bestTimeToCall: z.string().min(1, 'Best time to call is required'),
  loanAmount: z.string().min(1, 'Loan amount is required'),
  monthlyIncome: z.string().min(1, 'Monthly income is required'),
  employmentStatus: z.string().min(1, 'Employment status is required'),
  loanPurpose: z.string().min(1, 'Loan purpose is required'),
  financialInstitution: z.string().min(1, 'Financial institution is required'),
  accountNumber: z.string().regex(ACCOUNT_REGEX, 'Account number must contain only digits'),
  ssnLastFour: z.string().regex(SSN_LAST_FOUR_REGEX, 'SSN must be exactly 4 digits')
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

// Validate ZIP code format
export const isValidZip = (zip: string): boolean => {
  return ZIP_REGEX.test(zip);
};

// Validate account number format
export const isValidAccountNumber = (accountNumber: string): boolean => {
  return ACCOUNT_REGEX.test(accountNumber);
};

// Validate SSN last 4 format
export const isValidSsnLastFour = (ssn: string): boolean => {
  return SSN_LAST_FOUR_REGEX.test(ssn);
};