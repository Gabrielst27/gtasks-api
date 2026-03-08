export interface IMailService {
  sendPasswordRequest(email: string, token: string);
}
