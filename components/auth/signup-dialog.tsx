'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { Loader2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, useAuthDialogs, useEmailAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const signupSchema = z
  .object({
    email: z.email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupForm = z.infer<typeof signupSchema>;

export function SignupDialog() {
  const router = useRouter();

  const mutation = useMutation(api.users.createUser);

  const { isSignupOpen, closeDialog, switchToLogin } = useAuthDialogs();
  const { signUpWithEmail, isLoaded } = useEmailAuth();
  const { isSignedIn, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    setError(null);

    if (isSignedIn) {
      router.push('/dashboard');
    }

    const result = await signUpWithEmail(data.email, data.password);

    if (result.error) {
      setError(result.error);
    } else {
      mutation({
        name: data.email.split('@')[0],
        email: data.email,
      });
      router.push('/dashboard');
      reset();
    }

    setIsLoading(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog();
      reset();
      setError(null);
    }
  };

  return (
    <Dialog open={isSignupOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl border shadow-xl p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight text-black">
            Create your account
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Get started by entering your details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
          <div className="space-y-2">
            <Label
              htmlFor="signup-email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="name@example.com"
              className="rounded-xl h-11"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="signup-password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="***********"
              className="rounded-xl h-11"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-destructive text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirm-password"
              className="text-sm font-medium text-gray-600"
            >
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="***********"
              className="rounded-xl h-11"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-destructive text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-destructive text-sm text-center mt-2">{error}</p>
          )}

          {/* Clerk CAPTCHA element */}
          <div id="clerk-captcha" className="mt-3" />

          <Button
            type="submit"
            className="w-full rounded-xl h-11 text-[15px] font-medium shadow-sm bg-[#22d3ee]"
            disabled={isLoading || !isLoaded}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <button
            type="button"
            onClick={switchToLogin}
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
