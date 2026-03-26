import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectRequestDto {
  @IsNotEmpty({ message: 'name não pode estar vazio' })
  @IsString({ message: 'name deve ser uma string' })
  @ApiProperty({ description: 'Nome do projeto' })
  name: string;

  @IsOptional({ message: 'description não pode estar vazio' })
  @IsString({ message: 'description deve ser uma string' })
  @ApiProperty({ description: 'Descrição do projeto', required: false })
  description?: string;

  @IsNotEmpty({ message: 'slug não pode estar vazio' })
  @IsString({ message: 'slug deve ser uma string' })
  @ApiProperty({ description: 'Slug do projeto' })
  slug: string;
}
