import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindProjectBySlugRequestDto {
  @IsNotEmpty({ message: 'slug não pode estar vazio' })
  @IsString({ message: 'slug deve ser uma string' })
  @ApiProperty({ description: 'Slug do projeto' })
  slug: string;
}
