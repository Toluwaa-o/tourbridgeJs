'use client';

import { useUser, useSignIn, useSignUp, useClerk } from '@clerk/nextjs';
import { useAuthStore } from '@/stores/auth-store';

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

  return {
    user,
    isLoaded,
    isSignedIn,
    signOut: () => signOut(),
  };
}

export function useAuthDialogs() {
  const {
    activeDialog,
    openLogin,
    openSignup,
    closeDialog,
    switchToLogin,
    switchToSignup,
  } = useAuthStore();

  return {
    activeDialog,
    isLoginOpen: activeDialog === 'login',
    isSignupOpen: activeDialog === 'signup',
    openLogin,
    openSignup,
    closeDialog,
    switchToLogin,
    switchToSignup,
  };
}

export function useEmailAuth() {
  const { signIn, isLoaded: isSignInLoaded, setActive } = useSignIn();
  const {
    signUp,
    isLoaded: isSignUpLoaded,
    setActive: setSignUpActive,
  } = useSignUp();
  const { closeDialog } = useAuthStore();

  const signInWithEmail = async (email: string, password: string) => {
    if (!isSignInLoaded || !signIn) return { error: 'Sign in not loaded' };

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        closeDialog();
        return { success: true };
      }

      return { error: 'Sign in incomplete' };
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      return { error: error.errors?.[0]?.message || 'Sign in failed' };
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!isSignUpLoaded || !signUp) return { error: 'Sign up not loaded' };

    try {
      const result = await signUp.create({
        username: email.split('@')[0],
        emailAddress: email,
        password,
      });

      if (result.status === 'complete') {
        await setSignUpActive({ session: result.createdSessionId });
        closeDialog();
        return { success: true };
      }

      if (result.status === 'missing_requirements') {
        const missing = result.missingFields;
        console.log('Missing fields:', missing);
        console.log('Unverified fields:', result.unverifiedFields);

        if (result.unverifiedFields?.includes('email_address')) {
          await signUp.prepareEmailAddressVerification({
            strategy: 'email_code',
          });
          return {
            error: 'Please check your email for verification code',
            needsVerification: true,
          };
        }

        return {
          error: `Missing required fields: ${missing?.join(', ') || 'unknown'}`,
        };
      }

      return { error: 'Sign up incomplete' };
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      return { error: error.errors?.[0]?.message || 'Sign up failed' };
    }
  };

  return {
    signInWithEmail,
    signUpWithEmail,
    isLoaded: isSignInLoaded && isSignUpLoaded,
  };
}
