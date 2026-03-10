export interface ICryptography {
  generateHash(password: string): Promise<string>;
  verifyPassword(password: string, hash: string): Promise<boolean>;
}
