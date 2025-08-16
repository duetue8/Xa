import { createClient } from '@supabase/supabase-js';
import { ApplicationFormData } from '../utils/validation';
import { Database } from '../types/supabase';

// Initialize Supabase client
const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
};

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: any; timestamp: number }>();

export class API {
  private static instance: API;
  private requestCount: Map<string, number> = new Map();
  private lastReset: number = Date.now();

  private constructor() {}

  public static getInstance(): API {
    if (!API.instance) {
      API.instance = new API;
    }
    return API.instance;
  }

  // Rate limiting check
  private async checkRateLimit(ip: string): Promise<boolean> {
    const now = Date.now();
    
    // Reset counters if window has passed
    if (now - this.lastReset > RATE_LIMIT.windowMs) {
      this.requestCount.clear();
      this.lastReset = now;
    }

    const currentCount = this.requestCount.get(ip) || 0;
    if (currentCount >= RATE_LIMIT.maxRequests) {
      return false;
    }

    this.requestCount.set(ip, currentCount + 1);
    return true;
  }

  // Cache management
  private getCached<T>(key: string): T | null {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data as T;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  // Submit new application
  public async submitApplication(data: ApplicationFormData): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('applications')
        .insert([{
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone_number: data.phoneNumber,
          loan_amount: data.loanAmount,
          monthly_income: data.monthlyIncome,
          employment_status: data.employmentStatus,
          loan_purpose: data.loanPurpose,
          financial_institution: data.financialInstitution,
          ip_address: window.clientIP, // Set by middleware
          user_agent: navigator.userAgent,
        }]);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error submitting application:', error);
      return {
        success: false,
        error: 'Failed to submit application. Please try again.',
      };
    }
  }

  // Retrieve applications with pagination
  public async getApplications(
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, any>
  ) {
    const cacheKey = `applications_${page}_${limit}_${JSON.stringify(filters)}`;
    const cached = this.getCached<any>(cacheKey);
    if (cached) return cached;

    try {
      let query = supabase
        .from('applications')
        .select('*', { count: 'exact' });

      // Apply filters
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) query = query.eq(key, value);
        });
      }

      // Apply pagination
      const start = (page - 1) * limit;
      query = query.range(start, start + limit - 1);

      const { data, count, error } = await query;

      if (error) throw error;

      const result = {
        data,
        total: count,
        page,
        totalPages: Math.ceil((count || 0) / limit),
      };

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }

  // Create export job
  public async createExportJob(filters?: Record<string, any>, dateRange?: { start: Date; end: Date }) {
    try {
      const { data, error } = await supabase
        .rpc('create_export_job', {
          filters: filters ? JSON.stringify(filters) : null,
          date_range: dateRange
            ? `[${dateRange.start.toISOString()},${dateRange.end.toISOString()}]`
            : null,
        });

      if (error) throw error;
      return { jobId: data };
    } catch (error) {
      console.error('Error creating export job:', error);
      throw error;
    }
  }

  // Check export job status
  public async checkExportStatus(jobId: string) {
    try {
      const { data, error } = await supabase
        .from('export_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error checking export status:', error);
      throw error;
    }
  }

  // Download export file
  public async downloadExport(jobId: string) {
    try {
      const { data: job } = await supabase
        .from('export_jobs')
        .select('file_name')
        .eq('id', jobId)
        .single();

      if (!job) throw new Error('Export job not found');

      const { data, error } = await supabase
        .storage
        .from('exports')
        .download(job.file_name);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error downloading export:', error);
      throw error;
    }
  }
}

export default API.getInstance();