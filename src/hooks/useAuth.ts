import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services';
import type { User } from '../types';
import { ROUTES } from '../lib/constants';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (mounted) setUser(currentUser);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    const { data: { subscription } } = authService.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        const currentUser = await authService.getCurrentUser();
        if (mounted) setUser(currentUser);
      } else if (event === 'SIGNED_OUT') {
        if (mounted) setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const data = await authService.signIn(email, password);
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
    return data;
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string, orgName: string) => {
    const data = await authService.signUp(email, password, fullName, orgName);
    return data;
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
    navigate(ROUTES.HOME);
  }, [navigate]);

  return { user, loading, signIn, signUp, signOut };
}
