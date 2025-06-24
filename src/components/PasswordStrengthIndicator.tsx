import React from 'react';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthIndicatorProps {
  password?: string;
}

type StrengthLevel = {
  label: string;
  value: number;
  colorClass: string;
};

const calculatePasswordStrength = (password: string): StrengthLevel => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 0:
    case 1:
      return { label: 'Very Weak', value: 20, colorClass: 'bg-red-500' };
    case 2:
      return { label: 'Weak', value: 40, colorClass: 'bg-orange-500' };
    case 3:
      return { label: 'Medium', value: 60, colorClass: 'bg-yellow-500' };
    case 4:
      return { label: 'Strong', value: 80, colorClass: 'bg-blue-500' };
    case 5:
      return { label: 'Very Strong', value: 100, colorClass: 'bg-green-500' };
    default:
      return { label: '', value: 0, colorClass: '' };
  }
};

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
  console.log('PasswordStrengthIndicator loaded');

  if (!password) {
    return null; // Don't render anything if there's no password
  }

  const strength = calculatePasswordStrength(password);

  return (
    <div className="w-full space-y-1">
      <Progress value={strength.value} className="h-2 [&>div]:transition-all [&>div]:duration-300" indicatorClassName={strength.colorClass} />
      <p className="text-xs text-muted-foreground">
        Strength: <span className="font-semibold">{strength.label}</span>
      </p>
    </div>
  );
};

// Add a custom prop to Progress for the indicator color if it's not a default feature
// Since shadcn/ui Progress doesn't have an `indicatorClassName` prop by default,
// let's adjust the component to pass the class directly.
const PasswordStrengthIndicatorWithDirectClass: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
  console.log('PasswordStrengthIndicator loaded');
  
  if (!password) {
    return null;
  }
  
  const strength = calculatePasswordStrength(password);

  // Note: To apply dynamic colors to the Progress indicator, you might need to
  // adjust the Progress component itself or use a workaround. Here we pass it
  // into `className` and rely on CSS specificity or a custom variant.
  // For simplicity, we are passing a dynamic class to the indicator.
  // Let's create a simple version that works well with standard Tailwind.

  return (
    <div className="w-full space-y-2">
      <div className="relative h-2 w-full rounded-full bg-secondary">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${strength.colorClass}`}
          style={{ width: `${strength.value}%` }}
        />
      </div>
      {strength.label && (
        <p className="text-xs text-muted-foreground">
          Password strength: <span className="font-semibold">{strength.label}</span>
        </p>
      )}
    </div>
  );
};

// Re-implementing using the standard Progress component without modification.
const FinalPasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
  console.log('PasswordStrengthIndicator loaded');

  if (!password) {
    return (
        <div className="w-full space-y-1">
            <Progress value={0} className="h-2" />
            <p className="text-xs text-muted-foreground">Please enter a password.</p>
        </div>
    );
  }

  const strength = calculatePasswordStrength(password);

  return (
    <div className="w-full space-y-1">
        <Progress value={strength.value} className="h-2" indicatorClassName={strength.colorClass} />
        <p className="text-xs text-muted-foreground">
            Strength: <span className="font-semibold">{strength.label}</span>
        </p>
    </div>
  );
};

// The Progress component from shadcn/ui is not designed to have its indicator color changed via a prop easily.
// The `indicatorClassName` is not a standard prop.
// The best approach is a simple div-based progress bar for this custom color behavior.

const PasswordStrengthMeter: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
    console.log('PasswordStrengthIndicator loaded');

    if (!password) {
        return (
            <div className="w-full space-y-1">
                <div className="h-2 w-full rounded-full bg-muted" />
                <p className="text-xs text-muted-foreground">Enter a password to check its strength.</p>
            </div>
        );
    }
    
    const strength = calculatePasswordStrength(password);

    return (
        <div className="w-full space-y-1">
            <div className="flex w-full h-2 gap-1 rounded-full overflow-hidden bg-muted">
                <div className={`transition-all duration-300 ${scoreToClass(1, strength.value)}`} style={{ width: '20%' }} />
                <div className={`transition-all duration-300 ${scoreToClass(2, strength.value)}`} style={{ width: '20%' }} />
                <div className={`transition-all duration-300 ${scoreToClass(3, strength.value)}`} style={{ width: '20%' }} />
                <div className={`transition-all duration-300 ${scoreToClass(4, strength.value)}`} style={{ width: '20%' }} />
                <div className={`transition-all duration-300 ${scoreToClass(5, strength.value)}`} style={{ width: '20%' }} />
            </div>
            {strength.label && (
                <p className="text-xs text-muted-foreground">
                    Password strength: <span className="font-semibold">{strength.label}</span>
                </p>
            )}
        </div>
    );
}

const scoreToClass = (barIndex: number, strengthValue: number) => {
    const score = strengthValue / 20;
    if (barIndex > score) return 'bg-muted';
    
    if (score <= 1) return 'bg-red-500'; // Very Weak
    if (score <= 2) return 'bg-orange-500'; // Weak
    if (score <= 3) return 'bg-yellow-500'; // Medium
    if (score <= 4) return 'bg-blue-500'; // Strong
    return 'bg-green-500'; // Very Strong
}


export default PasswordStrengthMeter;