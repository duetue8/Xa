import { ApplicationFormData } from '../utils/validation';

interface ValidationResponse {
  isValid: boolean;
  error?: string;
}

class ApplicationService {
  private static instance: ApplicationService;
  private applications: Map<string, Set<string>> = new Map();
  
  private constructor() {
    // Private constructor to enforce singleton
  }

  public static getInstance(): ApplicationService {
    if (!ApplicationService.instance) {
      ApplicationService.instance = new ApplicationService();
    }
    return ApplicationService.instance;
  }

  // Check for duplicate application
  public async checkDuplicate(email: string, phone: string): Promise<ValidationResponse> {
    // Normalize inputs
    const normalizedEmail = email.toLowerCase();
    const normalizedPhone = phone.replace(/\D/g, '');

    // Check email duplicates
    const emailApplications = this.applications.get(normalizedEmail);
    if (emailApplications) {
      return {
        isValid: false,
        error: 'An application with this email already exists'
      };
    }

    // Check phone duplicates
    const phoneApplications = this.applications.get(normalizedPhone);
    if (phoneApplications) {
      return {
        isValid: false,
        error: 'An application with this phone number already exists'
      };
    }

    return { isValid: true };
  }

  // Store application
  public async storeApplication(data: ApplicationFormData): Promise<void> {
    const normalizedEmail = data.email.toLowerCase();
    const normalizedPhone = data.phoneNumber.replace(/\D/g, '');

    // Store email reference
    this.applications.set(normalizedEmail, new Set([normalizedPhone]));
    
    // Store phone reference
    this.applications.set(normalizedPhone, new Set([normalizedEmail]));

    // Log the application attempt
    this.logApplication(data);
  }

  // Log application attempts
  private logApplication(data: ApplicationFormData): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      email: data.email,
      phone: data.phoneNumber,
      status: 'submitted'
    };

    console.log('Application Log:', logEntry);
  }
}

export default ApplicationService;