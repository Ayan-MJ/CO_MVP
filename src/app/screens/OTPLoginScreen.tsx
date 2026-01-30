import React from 'react';
import { Mail, Phone, ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { Input, OTPInput, SegmentedControl } from '@/app/components/Input';
import { TopBar } from '@/app/components/Navigation';
import { InlineError } from '@/app/components/Feedback';

interface OTPLoginScreenProps {
  onBack: () => void;
  onVerified: () => void;
}

type LoginMethod = 'phone' | 'email';
type LoginStep = 'input' | 'otp';

export function OTPLoginScreen({ onBack, onVerified }: OTPLoginScreenProps) {
  const [loginMethod, setLoginMethod] = React.useState<LoginMethod>('phone');
  const [step, setStep] = React.useState<LoginStep>('input');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [otpValue, setOtpValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [canResend, setCanResend] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(30);

  const contactValue = loginMethod === 'phone' ? phoneNumber : email;

  // Resend timer
  React.useEffect(() => {
    if (step === 'otp' && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [step, resendTimer]);

  const validateInput = () => {
    setError('');
    if (loginMethod === 'phone') {
      const phoneRegex = /^\+?1?\d{10,}$/;
      if (!phoneRegex.test(phoneNumber.replace(/\D/g, ''))) {
        setError('Please enter a valid phone number');
        return false;
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return false;
      }
    }
    return true;
  };

  const handleSendCode = async () => {
    if (!validateInput()) return;

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setResendTimer(30);
      setCanResend(false);
    }, 1500);
  };

  const handleResendCode = () => {
    if (!canResend) return;
    setResendTimer(30);
    setCanResend(false);
    setOtpValue('');
    // Simulate resend
    setTimeout(() => {
      // Show success toast
    }, 500);
  };

  const handleVerifyOTP = async () => {
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      // Mock: check if code is valid
      if (otpValue === '123456') {
        onVerified();
      } else {
        setError('Invalid code. Please try again.');
        setOtpValue('');
      }
    }, 1000);
  };

  const handleBackToInput = () => {
    setStep('input');
    setOtpValue('');
    setError('');
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar
        title={step === 'input' ? 'Sign In' : 'Verify Code'}
        onBack={step === 'otp' ? handleBackToInput : onBack}
      />

      <div className="flex-1 p-6">
        {step === 'input' ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
                Welcome back
              </h2>
              <p className="text-[var(--text-callout)] text-text-secondary">
                Enter your {loginMethod === 'phone' ? 'phone number' : 'email'} to receive a verification code
              </p>
            </div>

            <SegmentedControl
              options={[
                { label: 'Phone', value: 'phone' },
                { label: 'Email', value: 'email' },
              ]}
              value={loginMethod}
              onChange={(value) => {
                setLoginMethod(value as LoginMethod);
                setError('');
              }}
            />

            {loginMethod === 'phone' ? (
              <Input
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setError('');
                }}
                error={error}
                type="tel"
              />
            ) : (
              <Input
                label="Email Address"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                error={error}
                type="email"
              />
            )}

            <div className="pt-4">
              <Button
                variant="primary"
                size="large"
                onClick={handleSendCode}
                loading={isLoading}
              >
                Send Verification Code
              </Button>
            </div>

            <div className="pt-2 px-4 py-3 bg-surface rounded-[var(--radius-sm)] border border-divider">
              <p className="text-[var(--text-footnote)] text-text-muted">
                We'll send you a 6-digit code to verify your {loginMethod === 'phone' ? 'number' : 'email'}. Standard rates may apply.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
                Enter verification code
              </h2>
              <p className="text-[var(--text-callout)] text-text-secondary">
                We sent a code to{' '}
                <span className="font-medium text-text-primary">{contactValue}</span>
              </p>
            </div>

            <div>
              <label className="block mb-3 text-[var(--text-callout)] font-medium text-text-primary">
                Verification Code
              </label>
              <OTPInput value={otpValue} onChange={setOtpValue} />
              {error && (
                <div className="mt-3">
                  <InlineError message={error} />
                </div>
              )}
            </div>

            <div>
              {canResend ? (
                <button
                  onClick={handleResendCode}
                  className="text-[var(--text-callout)] text-accent font-semibold"
                >
                  Resend code
                </button>
              ) : (
                <p className="text-[var(--text-callout)] text-text-muted">
                  Resend code in {resendTimer}s
                </p>
              )}
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                size="large"
                onClick={handleVerifyOTP}
                loading={isLoading}
                disabled={otpValue.length !== 6}
              >
                Verify & Continue
              </Button>
            </div>

            {/* Hint for demo */}
            <div className="pt-2 px-4 py-3 bg-accent-muted rounded-[var(--radius-sm)] border border-accent/20">
              <p className="text-[var(--text-caption)] text-text-secondary">
                <span className="font-semibold">Demo:</span> Enter 123456 to continue
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
