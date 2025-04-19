/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {object} - Result object with isValid flag and error message if invalid
 */
export const validateEmail = (email) => {
  // Check if email is provided
  if (!email) {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }

  // Check for spaces
  if (/\s/.test(email)) {
    return {
      isValid: false,
      error: 'Error: no spaces allowed'
    };
  }

  // Check for quotation marks
  if (/['"]/.test(email)) {
    return {
      isValid: false,
      error: 'Error: quotation marks are not allowed'
    };
  }

  // Check for non-ASCII characters
  const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!strictEmailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Invalid email format: Only standard ASCII characters allowed'
    };
  }

  // Check for suspicious admin patterns
  if (email.toLowerCase().includes('admin') || 
      email.toLowerCase().includes('root') || 
      email.toLowerCase().includes('system')) {
    return {
      isValid: false,
      error: 'Abnormal input found: Suspicious administrative email pattern'
    };
  }

  // Check for SQL injection attempts
  const sqlPatterns = ['--', ';', '/*', '*/', 'OR 1=1', 'DROP', 'DELETE', 'SELECT'];
  for (const pattern of sqlPatterns) {
    if (email.toUpperCase().includes(pattern)) {
      return {
        isValid: false,
        error: 'Abnormal input found: Potential SQL injection pattern detected'
      };
    }
  }

  // Check for XSS attempts
  const xssPatterns = ['<script', 'javascript:', 'onerror=', 'onload=', '<img', '<iframe'];
  for (const pattern of xssPatterns) {
    if (email.toLowerCase().includes(pattern)) {
      return {
        isValid: false,
        error: 'Abnormal input found: Potential XSS attempt detected'
      };
    }
  }

  // Email is valid
  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates a password
 * @param {string} password - The password to validate
 * @returns {object} - Result object with isValid flag and error message if invalid
 */
export const validatePassword = (password) => {
  // Check if password is provided
  if (!password) {
    return {
      isValid: false,
      error: 'Password is required'
    };
  }

  // Check for spaces
  if (/\s/.test(password)) {
    return {
      isValid: false,
      error: 'Error: no spaces allowed'
    };
  }

  // Check for quotation marks
  if (/['"]/.test(password)) {
    return {
      isValid: false,
      error: 'Error: quotation marks are not allowed'
    };
  }

  // Check password length
  if (password.length < 8) {
    return {
      isValid: false,
      error: 'Password must be at least 8 characters'
    };
  }

  // Check for numbers
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one number'
    };
  }

  // Check for non-ASCII characters
  if (/[^\x00-\x7F]/.test(password)) {
    return {
      isValid: false,
      error: 'Abnormal input found: Non-ASCII characters in password'
    };
  }

  // Check for suspicious password patterns
  const suspiciousPasswords = ['admin', 'password', '123456', 'qwerty'];
  for (const pattern of suspiciousPasswords) {
    if (password.toLowerCase().includes(pattern)) {
      return {
        isValid: false,
        error: 'Abnormal input found: Common password pattern detected'
      };
    }
  }

  // Check for SQL injection attempts
  const sqlPatterns = ['--', ';', '/*', '*/', 'OR 1=1', 'DROP', 'DELETE', 'SELECT'];
  for (const pattern of sqlPatterns) {
    if (password.toUpperCase().includes(pattern)) {
      return {
        isValid: false,
        error: 'Abnormal input found: Potential SQL injection pattern detected'
      };
    }
  }

  // Check for XSS attempts
  const xssPatterns = ['<script', 'javascript:', 'onerror=', 'onload=', '<img', '<iframe'];
  for (const pattern of xssPatterns) {
    if (password.toLowerCase().includes(pattern)) {
      return {
        isValid: false,
        error: 'Abnormal input found: Potential XSS attempt detected'
      };
    }
  }

  // Password is valid
  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates a login form with email and password
 * @param {string} email - The email to validate
 * @param {string} password - The password to validate
 * @returns {object} - Result object with isValid flag and error message if invalid
 */
export const validateLoginForm = (email, password) => {
  // Validate email
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  // Both email and password are valid
  return {
    isValid: true,
    error: null
  };
};

/**
 * Throwing errors instead of returning objects
 * @param {string} email - The email to validate
 * @param {string} password - The password to validate
 * @throws {Error} If validation fails
 */
export const validateLoginFormWithErrors = (email, password) => {
  // Validate email
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    throw new Error(emailValidation.error);
  }

  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    throw new Error(passwordValidation.error);
  }

  // Both email and password are valid
  return true;
};
