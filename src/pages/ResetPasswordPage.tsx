import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthFormCard from "@/components/AuthFormCard";
import PasswordStrengthMeter from "@/components/PasswordStrengthIndicator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the validation schema for the form
const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Set the error on the confirmPassword field
  });

type ResetPasswordFormValues = z.infer<typeof formSchema>;

const ResetPasswordPage = () => {
  console.log("ResetPasswordPage loaded");
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = form.watch("password");

  const onSubmit = (data: ResetPasswordFormValues) => {
    // In a real app, you'd make an API call here with the reset token and new password.
    console.log("Form submitted with:", { password: data.password });

    // Simulate a successful API call
    toast.success("Password has been reset successfully!", {
      description: "Redirecting you to the dashboard...",
    });

    // Redirect to the dashboard page on success
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <AuthFormCard
          title="Reset Your Password"
          description="Create a new, strong password for your account."
          footer={
            <Button type="submit" form="reset-password-form" className="w-full">
              Set New Password
            </Button>
          }
        >
          <Form {...form}>
            <form
              id="reset-password-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <PasswordStrengthMeter password={passwordValue} />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;