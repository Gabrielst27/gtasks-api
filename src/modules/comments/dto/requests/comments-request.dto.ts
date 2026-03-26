import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentRequestDto {
  @IsString({ message: 'O conteúdo deve estar no formato de string' })
  @IsNotEmpty({ message: 'O conteúdo não pode estar vazio' })
  @ApiProperty({ description: 'Conteúdo do comentário' })
  content: string;
}
