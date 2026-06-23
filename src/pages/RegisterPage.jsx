import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Mail, 
  Lock, 
  User,
  Eye, 
  EyeOff, 
  Dumbbell,
  AlertCircle,
  Check
} from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 6,
      hasLetter: /[a-zA-Z]/.test(password),
      hasNumber: /\d/.test(password)
    };
  };

  const passwordChecks = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setError('Password does not meet requirements');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Dumbbell className="h-10 w-10 text-orange-500" />
            <span className="text-3xl font-bold text-gray-900">
              Bro<span className="text-orange-500">Fit</span>
            </span>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-600">
            Start your fitness journey today
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  placeholder="John Doe"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  placeholder="you@example.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-11 pr-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className={`flex items-center text-xs ${passwordChecks.length ? 'text-green-600' : 'text-gray-400'}`}>
                    <Check className={`h-3 w-3 mr-1 ${passwordChecks.length ? '' : 'opacity-0'}`} />
                    At least 6 characters
                  </div>
                  <div className={`flex items-center text-xs ${passwordChecks.hasLetter ? 'text-green-600' : 'text-gray-400'}`}>
                    <Check className={`h-3 w-3 mr-1 ${passwordChecks.hasLetter ? '' : 'opacity-0'}`} />
                    Contains a letter
                  </div>
                  <div className={`flex items-center text-xs ${passwordChecks.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                    <Check className={`h-3 w-3 mr-1 ${passwordChecks.hasNumber ? '' : 'opacity-0'}`} />
                    Contains a number
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Terms Notice */}
        <p className="mt-6 text-center text-xs text-gray-500">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-orange-500 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
