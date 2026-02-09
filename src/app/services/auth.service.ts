import { Injectable, signal } from '@angular/core';
import { supabase } from '../supabase';
import { User, Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly user = signal<User | null>(null);
  readonly session = signal<Session | null>(null);
  readonly isAuthenticated = signal(false);

  constructor() {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      this.session.set(session);
      this.user.set(session?.user ?? null);
      this.isAuthenticated.set(!!session);
    });

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      this.session.set(session);
      this.user.set(session?.user ?? null);
      this.isAuthenticated.set(!!session);
    });
  }

  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error: error?.message ?? null };
  }

  async signUp(email: string, password: string, displayName?: string): Promise<{ error: string | null; needsConfirmation: boolean }> {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          display_name: displayName || email.split('@')[0]
        }
      }
    });

    if (error) {
      return { error: error.message, needsConfirmation: false };
    }

    // Check if email confirmation is required
    return {
      error: null,
      needsConfirmation: data.session === null
    };
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
    this.user.set(null);
    this.session.set(null);
    this.isAuthenticated.set(false);
  }

  async resetPassword(email: string): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { error: error?.message ?? null };
  }

  get currentUser(): User | null {
    return this.user();
  }
}
