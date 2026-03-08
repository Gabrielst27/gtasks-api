import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export namespace UpdateUserPasswordRequest {
  type Props = {
    newPassword: string;
  };

  export class Dto implements Props {
    @ApiProperty({ description: 'Nova senha do usuário', minLength: 6 })
    @IsNotEmpty({ message: 'A nova senha não pode estar vazia' })
    @IsString({ message: 'A nova senha deve ser string' })
    @MinLength(6, { message: 'A nova senha deve ter, no mínimo, 6 caracteres' })
    newPassword: string;

    constructor(props: Props) {
      this.newPassword = props.newPassword;
    }
  }

  export class Mapper {
    static toResponse(props: Props): Dto {
      return new Dto(props);
    }
  }
}
