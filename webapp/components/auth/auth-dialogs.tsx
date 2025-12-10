'use client';

import { useEffect } from 'react';
import { LoginDialog } from './login-dialog';
import { SignupDialog } from './signup-dialog';
import { useAuthStore } from '@/stores/auth-store';

export function AuthDialogs() {
  const { openLogin, openSignup } = useAuthStore();

  useEffect(() => {
    const handleOpenLogin = () => openLogin();
    const handleOpenSignup = () => openSignup();

    window.addEventListener('openLogin', handleOpenLogin);
    window.addEventListener('openSignup', handleOpenSignup);

    return () => {
      window.removeEventListener('openLogin', handleOpenLogin);
      window.removeEventListener('openSignup', handleOpenSignup);
    };
  }, [openLogin, openSignup]);

  return (
    <>
      <LoginDialog />
      <SignupDialog />
    </>
  );
}
