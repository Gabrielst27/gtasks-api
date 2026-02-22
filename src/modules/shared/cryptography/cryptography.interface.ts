export interface ICryptography {
  generateHash(password: string): string;
  verifyPassword(password: string, hash: string): boolean;
}
