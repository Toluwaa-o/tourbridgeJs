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
import { useAuthDialogs, useEmailAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginDialog() {
  const router = useRouter()

  const { isLoginOpen, closeDialog, switchToSignup } = useAuthDialogs();
  const { signInWithEmail, isLoaded } = useEmailAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);

    const result = await signInWithEmail(data.email, data.password);

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/dashboard')
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
    <Dialog open={isLoginOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl border shadow-xl p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
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
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="rounded-xl h-11"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-destructive text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-destructive text-sm text-center mt-2">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full rounded-xl h-11 text-[15px] font-medium shadow-sm"
            disabled={isLoading || !isLoaded}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={switchToSignup}
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
