export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxLength: number;
}

export const DEFAULT_PASSWORD_POLICY: PasswordPolicy = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
};

export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
}

export function validatePassword(
  password: string,
  policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY,
  lang: 'fr' | 'en' = 'fr'
): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < policy.minLength) {
    errors.push(
      lang === 'fr'
        ? `Le mot de passe doit contenir au moins ${policy.minLength} caractères`
        : `Password must be at least ${policy.minLength} characters`
    );
  }

  if (password.length > policy.maxLength) {
    errors.push(
      lang === 'fr'
        ? `Le mot de passe ne doit pas dépasser ${policy.maxLength} caractères`
        : `Password must not exceed ${policy.maxLength} characters`
    );
  }

  if (policy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push(
      lang === 'fr'
        ? 'Le mot de passe doit contenir au moins une majuscule'
        : 'Password must contain at least one uppercase letter'
    );
  }

  if (policy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push(
      lang === 'fr'
        ? 'Le mot de passe doit contenir au moins une minuscule'
        : 'Password must contain at least one lowercase letter'
    );
  }

  if (policy.requireNumbers && !/[0-9]/.test(password)) {
    errors.push(
      lang === 'fr'
        ? 'Le mot de passe doit contenir au moins un chiffre'
        : 'Password must contain at least one number'
    );
  }

  if (policy.requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) {
    errors.push(
      lang === 'fr'
        ? 'Le mot de passe doit contenir au moins un caractère spécial'
        : 'Password must contain at least one special character'
    );
  }

  return { valid: errors.length === 0, errors };
}
