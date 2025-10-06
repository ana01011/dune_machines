import React, { useState, useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, User, Chrome } from 'lucide-react';
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
  const [otpSource, setOtpSource] = useState<'signup' | 'forgot-password'>('signup');

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const stars = useMemo(() => {
    return [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${8 + Math.random() * 3}s`,
      opacity: 0.2 + Math.random() * 0.7,
      scale: 0.5 + Math.random() * 0.5
    }));
  }, []);

  const glitters = useMemo(() => {
    return [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 6}s`,
      animationDuration: `${1 + Math.random() * 2}s`,
      opacity: 0.2 + Math.random() * 0.5,
      scale: 0.3 + Math.random() * 0.4
    }));
  }, []);


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
    setSuccess('Account created! Please verify your email with the OTP sent.');
    setOtpSource('signup');
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

    if (otpSource === 'signup') {
      setSuccess('Email verified successfully!');
      setTimeout(() => {
        onAuthComplete();
      }, 1000);
    } else {
      setSuccess('OTP verified! Please set a new password.');
      setTimeout(() => {
        setView('reset-password');
      }, 1000);
    }
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
      setError(authError.message || 'Failed to send OTP. Please try again.');
      return;
    }

    setEmail(resetEmail);
    setLoading(false);
    setSuccess('OTP sent to your email!');
    setOtpSource('forgot-password');
    setTimeout(() => {
      setView('otp');
    }, 1500);
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const { data, error: authError } = await authService.signInWithGoogle();

    if (authError) {
      setLoading(false);
      setError(authError.message || 'Failed to sign in with Google.');
      return;
    }

    setLoading(false);
    setSuccess('Signed in with Google!');
    setTimeout(() => {
      onAuthComplete();
    }, 1000);
  };

  const renderLoginForm = () => (
    <div ref={formRef} className="w-full max-w-md mx-auto">
      <div className="text-center mb-3 md:mb-6">
        <h1 className="text-2xl md:text-4xl font-light text-white mb-2 md:mb-3 tracking-wider">
          WELCOME BACK
        </h1>
        <p className="text-white/60 text-xs md:text-sm">
          Sign in to continue to {selectedAI.toUpperCase()}
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-white/80 text-xs md:text-sm mb-1 md:mb-1.5 font-light tracking-wide">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <Mail className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-10 md:px-12 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-xs md:text-sm mb-1 md:mb-1.5 font-light tracking-wide">
            PASSWORD
          </label>
          <div className="relative">
            <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-white/40" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-10 md:px-12 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="Enter your password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 md:w-5 h-4 md:h-5" /> : <Eye className="w-4 md:w-5 h-4 md:h-5" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setView('forgot-password')}
            className="text-blue-400 hover:text-blue-300 text-xs md:text-sm font-light transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-2.5 md:p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
            <AlertCircle className="w-4 md:w-5 h-4 md:h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-xs md:text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 p-2.5 md:p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-xs md:text-sm">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-2.5 md:py-3 rounded-xl text-sm md:text-base font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span>{loading ? 'SIGNING IN...' : 'SIGN IN'}</span>
          <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="relative my-3 md:my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs md:text-sm">
            <span className="px-3 md:px-4 bg-black/40 text-white/60">OR CONTINUE WITH</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white py-2.5 md:py-3 rounded-xl text-sm md:text-base font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 md:space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Chrome className="w-4 md:w-5 h-4 md:h-5" />
          <span>Google</span>
        </button>

        <p className="text-center text-white/60 text-xs md:text-sm">
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
      <div className="text-center mb-3 md:mb-6">
        <h1 className="text-2xl md:text-4xl font-light text-white mb-2 md:mb-3 tracking-wider">
          CREATE ACCOUNT
        </h1>
        <p className="text-white/60 text-xs md:text-sm">
          Join {selectedAI.toUpperCase()} to get started
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-2.5 md:space-y-4">
        <div>
          <label className="block text-white/80 text-xs md:text-sm mb-1 md:mb-1.5 font-light tracking-wide">
            FULL NAME
          </label>
          <div className="relative">
            <User className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-white/40" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-10 md:px-12 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="John Doe"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-xs md:text-sm mb-1 md:mb-1.5 font-light tracking-wide">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <Mail className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-10 md:px-12 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-xs md:text-sm mb-1 md:mb-1.5 font-light tracking-wide">
            PASSWORD
          </label>
          <div className="relative">
            <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-white/40" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-10 md:px-12 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="At least 8 characters"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 md:w-5 h-4 md:h-5" /> : <Eye className="w-4 md:w-5 h-4 md:h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-xs md:text-sm mb-1 md:mb-1.5 font-light tracking-wide">
            CONFIRM PASSWORD
          </label>
          <div className="relative">
            <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-white/40" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-10 md:px-12 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="Confirm your password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-4 md:w-5 h-4 md:h-5" /> : <Eye className="w-4 md:w-5 h-4 md:h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-2.5 md:p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
            <AlertCircle className="w-4 md:w-5 h-4 md:h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-xs md:text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 p-2.5 md:p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-xs md:text-sm">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-2.5 md:py-3 rounded-xl text-sm md:text-base font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span>{loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}</span>
          <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="relative my-3 md:my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs md:text-sm">
            <span className="px-3 md:px-4 bg-black/40 text-white/60">OR CONTINUE WITH</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white py-2.5 md:py-3 rounded-xl text-sm md:text-base font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 md:space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Chrome className="w-4 md:w-5 h-4 md:h-5" />
          <span>Google</span>
        </button>

        <p className="text-center text-white/60 text-xs md:text-sm">
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
      <div className="text-center mb-6 md:mb-8">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
          <Mail className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
        </div>
        <h1 className="text-2xl md:text-4xl font-light text-white mb-3 md:mb-4 tracking-wider">
          {otpSource === 'signup' ? 'VERIFY EMAIL' : 'VERIFY OTP'}
        </h1>
        <p className="text-white/60 text-xs md:text-sm px-4">
          We've sent a 6-digit code to<br />
          <span className="text-white">{email}</span>
        </p>
      </div>

      <form onSubmit={handleOtpVerify} className="space-y-4 md:space-y-6">
        <div className="flex justify-center space-x-2 md:space-x-3">
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
              className="w-12 h-12 md:w-14 md:h-14 bg-black/40 border border-white/10 rounded-xl text-center text-xl md:text-2xl text-white focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              disabled={loading}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-2.5 md:p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
            <AlertCircle className="w-4 md:w-5 h-4 md:h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-xs md:text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 p-2.5 md:p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-xs md:text-sm">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-2.5 md:py-3 rounded-xl text-sm md:text-base font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span>{loading ? 'VERIFYING...' : 'VERIFY CODE'}</span>
          <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setView(otpSource === 'signup' ? 'signup' : 'forgot-password')}
            className="text-blue-400 hover:text-blue-300 text-xs md:text-sm font-medium transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              setSuccess('New code sent!');
              setTimeout(() => setSuccess(''), 3000);
            }}
            className="text-blue-400 hover:text-blue-300 text-xs md:text-sm font-medium transition-colors"
          >
            Resend
          </button>
        </div>
      </form>
    </div>
  );

  const renderForgotPasswordForm = () => (
    <div ref={formRef} className="w-full max-w-md mx-auto">
      <div className="text-center mb-6 md:mb-8">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
          <Lock className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
        </div>
        <h1 className="text-2xl md:text-4xl font-light text-white mb-3 md:mb-4 tracking-wider">
          FORGOT PASSWORD
        </h1>
        <p className="text-white/60 text-xs md:text-sm px-4">
          Enter your email to receive an OTP
        </p>
      </div>

      <form onSubmit={handleForgotPassword} className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-white/80 text-xs md:text-sm mb-1 md:mb-1.5 font-light tracking-wide">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <Mail className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-white/40" />
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-10 md:px-12 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-2.5 md:p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
            <AlertCircle className="w-4 md:w-5 h-4 md:h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-xs md:text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 p-2.5 md:p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-xs md:text-sm">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-2.5 md:py-3 rounded-xl text-sm md:text-base font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span>{loading ? 'SENDING...' : 'SEND OTP'}</span>
          <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-white/60 text-xs md:text-sm">
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
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(1,4,9,0.95) 10%, rgba(2,6,23,0.9) 20%, rgba(10,15,28,0.85) 35%, rgba(15,23,42,0.8) 50%, rgba(2,6,23,0.9) 65%, rgba(1,4,9,0.95) 80%, rgba(0,0,0,1) 100%)'
      }}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blurred Exoplanet/Blackhole at top */}
        <div className="absolute -top-64 left-1/2 transform -translate-x-1/2">
          <div
            className="w-96 h-96 sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-20 animate-planet-rotate-smooth"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.6) 25%, rgba(30, 64, 175, 0.4) 50%, rgba(15, 23, 42, 0.2) 75%, transparent 100%)',
              filter: 'blur(40px)',
              boxShadow: '0 0 200px rgba(59, 130, 246, 0.3), inset 0 0 100px rgba(29, 78, 216, 0.2)'
            }}
          />
          {/* Planet atmosphere glow */}
          <div
            className="absolute inset-0 w-96 h-96 sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-10 animate-planet-rotate-reverse-smooth"
            style={{
              background: 'radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
        </div>

        {/* Ultra-small glittering stars */}
        <div className="absolute inset-0">
          {stars.map((star, i) => (
            <div
              key={`particle-${i}`}
              className="absolute bg-white rounded-full animate-pulse twinkle-star"
              style={{
                width: '0.1px',
                height: '0.1px',
                left: star.left,
                top: star.top,
                animationDelay: star.animationDelay,
                animationDuration: star.animationDuration,
                opacity: star.opacity,
                boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
                transform: `scale(${star.scale})`
              }}
            />
          ))}
          {/* Additional tiny glitter layer */}
          {glitters.map((glitter, i) => (
            <div
              key={`glitter-${i}`}
              className="absolute bg-blue-200 rounded-full animate-pulse twinkle-star-blue"
              style={{
                width: '0.5px',
                height: '0.5px',
                left: glitter.left,
                top: glitter.top,
                animationDelay: glitter.animationDelay,
                animationDuration: glitter.animationDuration,
                opacity: glitter.opacity,
                boxShadow: '0 0 1px rgba(191, 219, 254, 0.6)',
                transform: `scale(${glitter.scale})`
              }}
            />
          ))}
        </div>
      </div>

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

        <div className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
          {view === 'login' && renderLoginForm()}
          {view === 'signup' && renderSignupForm()}
          {view === 'otp' && renderOtpForm()}
          {view === 'forgot-password' && renderForgotPasswordForm()}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes planetRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes planetRotateReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .animate-planet-rotate-smooth {
          animation: planetRotate 120s linear infinite;
        }

        .animate-planet-rotate-reverse-smooth {
          animation: planetRotateReverse 80s linear infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.5);
            filter: brightness(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
            filter: brightness(1.5);
          }
        }

        @keyframes twinkleBlue {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.3);
            filter: brightness(0.7) hue-rotate(0deg);
          }
          33% {
            opacity: 0.8;
            transform: scale(1);
            filter: brightness(1.4) hue-rotate(10deg);
          }
          66% {
            opacity: 0.5;
            transform: scale(0.6);
            filter: brightness(1.1) hue-rotate(-5deg);
          }
        }

        .twinkle-star {
          animation: twinkle 3s ease-in-out infinite;
        }

        .twinkle-star-blue {
          animation: twinkleBlue 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
