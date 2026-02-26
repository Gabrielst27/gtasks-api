import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';

export namespace SignUpUseCase {
  export type Input = SignUpDto;
  export type Output = {};
}
