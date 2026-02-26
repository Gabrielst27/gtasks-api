import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Nova senha do usuário', minLength: 6 })
  @IsNotEmpty({ message: 'A nova senha não pode estar vazia' })
  @IsString({ message: 'A nova senha deve ser string' })
  @MinLength(6, { message: 'A nova senha deve ter, no mínimo, 6 caracteres' })
  newPassword: string;

  @ApiProperty({ description: 'Token do usuário' })
  @IsString({ message: 'O token deve ser string' })
  @IsNotEmpty({ message: 'O token não pode estar vazio' })
  token: string;
}
