import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserEntityProps } from 'src/domain/users/entities/user-entity';

export class UserRequestDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'Apenas letras e espaço em branco são permitidos no nome',
  })
  @MinLength(2, { message: 'O nome deve conter pelo menos 2 caracteres' })
  @MaxLength(64, { message: 'O nome pode conter no máximo 64 caracteres' })
  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @IsOptional()
  @IsUrl({}, { message: 'O avatar deve ser uma url' })
  @ApiProperty({
    description: 'Url da imagem de avatar do usuário',
    required: false,
  })
  avatar?: string;

  constructor(
    props: Omit<
      UserEntityProps,
      'password' | 'email' | 'role' | 'createdAt' | 'updatedAt'
    >,
  ) {
    this.name = props.name;
    this.avatar = props.avatar;
  }
}
