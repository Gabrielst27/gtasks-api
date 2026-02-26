import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'Email do usuário', uniqueItems: true })
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  @IsEmail({}, { message: 'O email deve estar no formato de email' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário', minLength: 6 })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @IsString({ message: 'A senha deve ser string' })
  @MinLength(6, { message: 'A senha deve ter, no mínimo, 6 caracteres' })
  password: string;
}
