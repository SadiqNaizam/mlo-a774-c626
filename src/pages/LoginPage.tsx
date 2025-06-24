import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import AuthFormCard from '@/components/AuthFormCard';
import SocialLoginButton from '@/components/SocialLoginButton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const LoginPage = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you would handle form submission, API calls, and validation here.
    console.log('Attempting to log in...');
    // On successful login, navigate to the dashboard.
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormCard
          title="Welcome Back"
          description="Sign in to continue to AuthSecure"
          footer={
            <div className="w-full text-center text-sm">
              {"Don't have an account? "}
              <Link to="/registration" className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </div>
          }
        >
          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <SocialLoginButton provider="google" />
            <SocialLoginButton provider="github" />
          </div>

          {/* Separator */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-sm font-normal">Remember me</Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;