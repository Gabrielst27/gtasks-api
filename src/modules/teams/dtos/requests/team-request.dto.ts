import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class TeamRequestDto {
  @IsNotEmpty({ message: 'O nome da equipe não pode estar vazio' })
  @IsString({ message: 'O nome da equipe deve ser string' })
  @MinLength(8, {
    message: 'O nome da equipe deve conter mais de 8 caracteres',
  })
  @MaxLength(24, { message: 'O nome da equipe pode conter até 24 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O nome da equipe não pode estar vazio' })
  @IsString({ message: 'O nome da equipe deve ser string' })
  slug: string;
}
