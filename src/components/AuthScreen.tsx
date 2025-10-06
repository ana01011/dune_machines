import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CircleCheck as CheckCircle, CircleAlert as AlertCircle, User, Chromium as Chrome } from 'lucide-react';
import { ThemeBackground } from './ThemeBackground';
import { getTheme } from '../themes/chatThemes';
import { authService } from '../services/authService';

interface AuthScreenProps {
  selectedAI: string;
  onAuthComplete: () => void;
  onBack: () => void;
}

type AuthView = 'login' | 'signup' | 'otp' | 'forgot-password' | 'reset-password';

export const AuthScreen: React.FC<AuthScreenProps> = ({ selectedAI, onAuthComplete, onBack }) => {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const theme = getTheme('dark');

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [view]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);

    const { data, error: authError } = await authService.signIn(email, password);

    if (authError) {
      setLoading(false);
      setError(authError.message || 'Failed to sign in. Please check your credentials.');
      return;
    }

    setLoading(false);
    setSuccess('Login successful!');
    setTimeout(() => {
      onAuthComplete();
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const { data, error: authError } = await authService.signUp(email, password, name);

    if (authError) {
      setLoading(false);
      setError(authError.message || 'Failed to create account. Please try again.');
      return;
    }

    setLoading(false);
    setSuccess('Account created! Check your email for verification.');
    setTimeout(() => {
      setView('otp');
    }, 1500);
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);

    const { data, error: authError } = await authService.verifyOtp(email, otpValue);

    if (authError) {
      setLoading(false);
      setError(authError.message || 'Invalid verification code. Please try again.');
      return;
    }

    setLoading(false);
    setSuccess('Email verified successfully!');
    setTimeout(() => {
      onAuthComplete();
    }, 1000);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(resetEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    const { data, error: authError } = await authService.resetPassword(resetEmail);

    if (authError) {
      setLoading(false);
      setError(authError.message || 'Failed to send reset link. Please try again.');
      return;
    }

    setLoading(false);
    setSuccess('Password reset link sent to your email!');
    setTimeout(() => {
      setView('login');
    }, 2000);
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const { data, error: authError } = await authService.signInWithGoogle();

    if (authError) {
      setLoading(false);
      setError(authError.message || 'Failed to sign in with Google.');
      return;
    }
  };

  const renderLoginForm = () => (
    <div ref={formRef} className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wider">
          WELCOME BACK
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Sign in to continue to {selectedAI.toUpperCase()}
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-white/80 text-sm mb-2 font-light tracking-wide">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-sm mb-2 font-light tracking-wide">
            PASSWORD
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="Enter your password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setView('forgot-password')}
            className="text-blue-400 hover:text-blue-300 text-sm font-light transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span>{loading ? 'SIGNING IN...' : 'SIGN IN'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-black/40 text-white/60">OR CONTINUE WITH</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white py-4 rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Chrome className="w-5 h-5" />
          <span>Google</span>
        </button>

        <p className="text-center text-white/60 text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setView('signup')}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );

  const renderSignupForm = () => (
    <div ref={formRef} className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wider">
          CREATE ACCOUNT
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Join {selectedAI.toUpperCase()} to get started
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <label className="block text-white/80 text-sm mb-2 font-light tracking-wide">
            FULL NAME
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="John Doe"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-sm mb-2 font-light tracking-wide">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-sm mb-2 font-light tracking-wide">
            PASSWORD
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="At least 8 characters"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-sm mb-2 font-light tracking-wide">
            CONFIRM PASSWORD
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="Confirm your password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span>{loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-black/40 text-white/60">OR CONTINUE WITH</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white py-4 rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Chrome className="w-5 h-5" />
          <span>Google</span>
        </button>

        <p className="text-center text-white/60 text-sm">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setView('login')}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );

  const renderOtpForm = () => (
    <div ref={formRef} className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wider">
          VERIFY EMAIL
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          We've sent a 6-digit code to<br />
          <span className="text-white">{email}</span>
        </p>
      </div>

      <form onSubmit={handleOtpVerify} className="space-y-6">
        <div className="flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (otpRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              className="w-14 h-14 bg-black/40 border border-white/10 rounded-xl text-center text-2xl text-white focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              disabled={loading}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span>{loading ? 'VERIFYING...' : 'VERIFY CODE'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-white/60 text-sm">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={() => {
              setSuccess('New code sent!');
              setTimeout(() => setSuccess(''), 3000);
            }}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  );

  const renderForgotPasswordForm = () => (
    <div ref={formRef} className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wider">
          FORGOT PASSWORD
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Enter your email to receive a password reset link
        </p>
      </div>

      <form onSubmit={handleForgotPassword} className="space-y-6">
        <div>
          <label className="block text-white/80 text-sm mb-2 font-light tracking-wide">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span>{loading ? 'SENDING...' : 'SEND RESET LINK'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-white/60 text-sm">
          Remember your password?{' '}
          <button
            type="button"
            onClick={() => setView('login')}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      <ThemeBackground theme={theme} />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="absolute top-8 left-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-light tracking-wide">BACK</span>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-20">
          {view === 'login' && renderLoginForm()}
          {view === 'signup' && renderSignupForm()}
          {view === 'otp' && renderOtpForm()}
          {view === 'forgot-password' && renderForgotPasswordForm()}
        </div>
      </div>
    </div>
  );
};
