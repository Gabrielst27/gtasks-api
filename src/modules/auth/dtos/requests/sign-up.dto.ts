import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from 'src/domain/users/enum/role.enum';

export class SignUpDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'Apenas letras e espaço em branco são permitidos no nome',
  })
  name: string;

  @ApiProperty({ description: 'Email do usuário', uniqueItems: true })
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  @IsEmail({}, { message: 'O email deve estar no formato de email' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário', minLength: 6 })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @IsString({ message: 'A senha deve ser string' })
  @MinLength(6, { message: 'A senha deve ter, no mínimo, 6 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Role do usuário',
    enum: Role,
    default: Role.USER,
    required: false,
  })
  @IsOptional()
  @IsEnum(Role, {
    message: 'O role deve conter um dos seguintes valores: user, admin',
  })
  role?: Role = Role.USER;
}
