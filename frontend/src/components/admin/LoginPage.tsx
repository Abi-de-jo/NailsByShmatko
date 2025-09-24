import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const API_BASE = 'http://localhost:3000';

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const endpoint = isLogin ? '/admin/login' : '/admin/register';
      const payload = isLogin 
        ? { username: formData.username, password: formData.password }
        : { username: formData.username, password: formData.password };

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Operation failed');
      }

      const data = await response.json();
      
      if (isLogin) {
        localStorage.setItem('adminToken', data.token);
        document.cookie = `adminToken=${data.token}; path=/; expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()}`;
        setSuccess('Login successful! Redirecting...');
        // Redirect to admin dashboard
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 1000);
      } else {
        setSuccess('Registration successful! You can now login.');
        setIsLogin(true); // Switch to login after successful registration
        setFormData({ username: '', password: '', confirmPassword: '' });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Check if user is already logged in
  React.useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      window.location.href = '/admin/dashboard';
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e7e4ff] to-[#faeb92]/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-[#9929EA] to-[#CC66DA] p-3 rounded-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#1c0038]">
              Beauty Salon Admin
            </h1>
          </div>
          <p className="text-[#CC66DA] text-lg">
            {isLogin ? 'Sign in to manage bookings' : 'Create admin account'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#faeb92] p-8">
          {/* Toggle */}
          <div className="flex bg-[#e7e4ff]/30 rounded-2xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                isLogin 
                  ? 'bg-[#9929EA] text-white shadow-lg' 
                  : 'text-[#1c0038] hover:bg-white/50'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                !isLogin 
                  ? 'bg-[#9929EA] text-white shadow-lg' 
                  : 'text-[#1c0038] hover:bg-white/50'
              }`}
            >
              Register
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#CC66DA]" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full pl-12 pr-4 py-4 bg-[#e7e4ff]/20 border-2 border-transparent rounded-xl focus:border-[#9929EA] focus:bg-white focus:ring-2 focus:ring-[#9929EA]/20 transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#CC66DA]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                minLength={6}
                className="w-full pl-12 pr-12 py-4 bg-[#e7e4ff]/20 border-2 border-transparent rounded-xl focus:border-[#9929EA] focus:bg-white focus:ring-2 focus:ring-[#9929EA]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#CC66DA] hover:text-[#9929EA] transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#CC66DA]" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-4 bg-[#e7e4ff]/20 border-2 border-transparent rounded-xl focus:border-[#9929EA] focus:bg-white focus:ring-2 focus:ring-[#9929EA]/20 transition-all"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#9929EA] to-[#CC66DA] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Info Message */}
          <div className="mt-6 p-4 bg-[#faeb92]/20 rounded-xl">
            <p className="text-sm text-[#1c0038]/70 text-center">
              {isLogin 
                ? '💡 First time? Switch to Register to create an account' 
                : '🔒 After registration, you can login to manage bookings'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;