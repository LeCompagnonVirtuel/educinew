import { AUTH } from '@educi/config';
import { PasswordPolicyError } from '@educi/errors';

export class PasswordService {
  private readonly minLength: number;
  private readonly maxLength: number;
  private readonly requireUppercase: boolean;
  private readonly requireLowercase: boolean;
  private readonly requireNumbers: boolean;
  private readonly requireSpecialChars: boolean;

  constructor(config?: Partial<typeof AUTH.PASSWORD_POLICY>) {
    const policy = { ...AUTH.PASSWORD_POLICY, ...config };
    this.minLength = policy.MIN_LENGTH;
    this.maxLength = policy.MAX_LENGTH;
    this.requireUppercase = policy.REQUIRE_UPPERCASE;
    this.requireLowercase = policy.REQUIRE_LOWERCASE;
    this.requireNumbers = policy.REQUIRE_NUMBERS;
    this.requireSpecialChars = policy.REQUIRE_SPECIAL_CHARS;
  }

  validate(password: string): string[] {
    const violations: string[] = [];

    if (password.length < this.minLength) {
      violations.push(`Le mot de passe doit contenir au moins ${this.minLength} caractères`);
    }
    if (password.length > this.maxLength) {
      violations.push(`Le mot de passe ne doit pas dépasser ${this.maxLength} caractères`);
    }
    if (this.requireUppercase && !/[A-Z]/.test(password)) {
      violations.push('Le mot de passe doit contenir au moins une majuscule');
    }
    if (this.requireLowercase && !/[a-z]/.test(password)) {
      violations.push('Le mot de passe doit contenir au moins une minuscule');
    }
    if (this.requireNumbers && !/\d/.test(password)) {
      violations.push('Le mot de passe doit contenir au moins un chiffre');
    }
    if (this.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      violations.push('Le mot de passe doit contenir au moins un caractère spécial');
    }

    return violations;
  }

  validateOrThrow(password: string): void {
    const violations = this.validate(password);
    if (violations.length > 0) {
      throw new PasswordPolicyError(violations);
    }
  }

  getStrength(password: string): { score: number; label: string } {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score <= 2) return { score, label: 'Faible' };
    if (score <= 4) return { score, label: 'Moyen' };
    return { score, label: 'Fort' };
  }

  generate(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const array = new Uint32Array(this.minLength + 4);
    crypto.getRandomValues(array);
    let password = '';
    for (let i = 0; i < array.length; i++) {
      password += chars[array[i] % chars.length];
    }
    if (!/[A-Z]/.test(password)) password = 'A' + password.slice(1);
    if (!/[a-z]/.test(password)) password = password.slice(0, 1) + 'a' + password.slice(2);
    if (!/\d/.test(password)) password = password.slice(0, 2) + '1' + password.slice(3);
    return password;
  }
}
