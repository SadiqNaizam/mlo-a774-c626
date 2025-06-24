import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  console.log('DashboardPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
            <CardDescription className="text-lg">
              You have successfully logged in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This is your main application dashboard. From here, you can manage your settings, view your activity, and explore all the features AuthSecure has to offer.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link to="#">Go to Profile</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="#">View Settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;