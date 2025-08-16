export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone_number: string
          loan_amount: number
          monthly_income: number
          employment_status: string
          loan_purpose: string
          financial_institution: string
          account_number: string | null
          ssn_last_four: string | null
          status: string
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
          city: string
          state: string
          zip_code: string
          best_time_to_call: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone_number: string
          loan_amount: number
          monthly_income: number
          employment_status: string
          loan_purpose: string
          financial_institution: string
          account_number?: string | null
          ssn_last_four?: string | null
          status?: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
          city: string
          state: string
          zip_code: string
          best_time_to_call: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone_number?: string
          loan_amount?: number
          monthly_income?: number
          employment_status?: string
          loan_purpose?: string
          financial_institution?: string
          account_number?: string | null
          ssn_last_four?: string | null
          status?: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
          city?: string
          state?: string
          zip_code?: string
          best_time_to_call?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          table_name: string
          record_id: string
          old_data: Json | null
          new_data: Json | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          table_name: string
          record_id: string
          old_data?: Json | null
          new_data?: Json | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          table_name?: string
          record_id?: string
          old_data?: Json | null
          new_data?: Json | null
          ip_address?: string | null
          created_at?: string
        }
      }
      export_jobs: {
        Row: {
          id: string
          user_id: string
          status: string
          file_name: string | null
          filters: Json | null
          date_range: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: string
          file_name?: string | null
          filters?: Json | null
          date_range?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          file_name?: string | null
          filters?: Json | null
          date_range?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      create_export_job: {
        Args: {
          filters: Json
          date_range: string
        }
        Returns: string
      }
    }
  }
}