import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: localStorage,
      storageKey: 'quickeloans-auth-token',
      flowType: 'pkce'
    }
  }
);

class AuthHandler {
  private static instance: AuthHandler;
  private isRedirecting = false;
  private retryCount = 0;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000;

  private constructor() {}

  public static getInstance(): AuthHandler {
    if (!AuthHandler.instance) {
      AuthHandler.instance = new AuthHandler();
    }
    return AuthHandler.instance;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async signOut(): Promise<void> {
    if (this.isRedirecting) return;
    
    this.isRedirecting = true;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      localStorage.removeItem('quickeloans-auth-token');
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Error during sign out:', error);
      toast.error('Failed to sign out');
      this.isRedirecting = false;
    }
  }

  public async checkSession(): Promise<boolean> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (!session) {
        return false;
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Session check error:', error);
      return false;
    }
  }

  public async getAuthenticatedClient(retryAttempt = 0) {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (!session) {
        throw new Error('No active session');
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Invalid user session');
      }

      return supabase;
    } catch (error) {
      if (retryAttempt < this.MAX_RETRIES) {
        await this.delay(this.RETRY_DELAY * (retryAttempt + 1));
        return this.getAuthenticatedClient(retryAttempt + 1);
      }
      throw error;
    }
  }

  public async executeWithRetry<T>(operation: () => Promise<T>): Promise<T> {
    this.retryCount = 0;
    
    const execute = async (): Promise<T> => {
      try {
        return await operation();
      } catch (error) {
        if (this.retryCount < this.MAX_RETRIES) {
          this.retryCount++;
          await this.delay(this.RETRY_DELAY * this.retryCount);
          return execute();
        }
        throw error;
      }
    };

    return execute();
  }
}

export default AuthHandler.getInstance();