import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Regular expression for basic email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to check for abnormal input
  const validateInput = () => {
    // Reset error state
    setError(null);
   
    // Check for empty fields
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
   
    // Strict email format validation (ASCII characters only)
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!strictEmailRegex.test(email)) {
      throw new Error('Invalid email format: Only standard ASCII characters allowed');
    }
   
    // Check password strength (at least 8 characters with at least one number)
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
   
    if (!/\d/.test(password)) {
      throw new Error('Password must contain at least one number');
    }
   
    // Check for non-ASCII characters in password
    if (/[^\x00-\x7F]/.test(password)) {
      throw new Error('Abnormal input found: Non-ASCII characters in password');
    }
   
    // Check for common suspicious patterns - expanded
    if (email.toLowerCase().includes('admin') ||
        email.toLowerCase().includes('root') ||
        email.toLowerCase().includes('system')) {
      throw new Error('Abnormal input found: Suspicious administrative email pattern');
    }
   
    // Check for suspicious password patterns
    const suspiciousPasswords = ['admin', 'password', '123456', 'qwerty'];
    for (const pattern of suspiciousPasswords) {
      if (password.toLowerCase().includes(pattern)) {
        throw new Error('Abnormal input found: Common password pattern detected');
      }
    }
   
    // Check for SQL injection attempts
    const sqlPatterns = ['--', ';', '/*', '*/', 'OR 1=1', 'DROP', 'DELETE', 'SELECT'];
    for (const pattern of sqlPatterns) {
      if (email.toUpperCase().includes(pattern) || password.toUpperCase().includes(pattern)) {
        throw new Error('Abnormal input found: Potential SQL injection pattern detected');
      }
    }
   
    // Check for XSS attempts
    const xssPatterns = ['<script', 'javascript:', 'onerror=', 'onload=', '<img', '<iframe'];
    for (const pattern of xssPatterns) {
      if (email.toLowerCase().includes(pattern) || password.toLowerCase().includes(pattern)) {
        throw new Error('Abnormal input found: Potential XSS attempt detected');
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    try {
      // Validate input
      validateInput();
     
      // If validation passes, process data accordingly
      console.log('Form submitted successfully with:', { email, password });
      alert('Login successful!');
     
    } catch (err) {
      // Handle validation errors
      setError(err.message);
      console.error('Validation error:', err.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Form</h2>
     
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
          <span className="text-red-700">{error}</span>
        </div>
      )}
     
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
       
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
       
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
