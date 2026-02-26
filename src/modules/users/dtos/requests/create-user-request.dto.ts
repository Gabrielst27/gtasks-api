import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserEntityProps } from 'src/domain/users/entities/user-entity';
import { UserRequestDto } from 'src/modules/users/dtos/requests/user-request.dto';

export namespace CreateUserRequest {
  export class Dto extends UserRequestDto {
    @IsNotEmpty({ message: 'O email não pode estar vazio' })
    @IsEmail({}, { message: 'O email deve estar formatado como email' })
    @ApiProperty({ description: 'Email do usuário' })
    email: string;

    @IsNotEmpty({ message: 'A senha não pode estar vazia' })
    @IsString({ message: 'A senha deve ser do tipo string' })
    @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres' })
    @MaxLength(64, { message: 'A senha pode conter no máximo 64 caracteres' })
    @ApiProperty({ description: 'Senha do usuário' })
    password: string;

    constructor(props: Omit<UserEntityProps, 'createdAt' | 'updatedAt'>) {
      super({ name: props.name, avatar: props.avatar });
      ((this.email = props.email), (this.password = props.password));
    }
  }

  export class Mapper {
    static mapToRequest(
      props: Omit<UserEntityProps, 'createdAt' | 'updatedAt'>,
    ): Dto {
      return new CreateUserRequest.Dto(props);
    }
  }
}
