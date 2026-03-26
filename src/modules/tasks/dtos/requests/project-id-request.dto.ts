import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProjectIdRequestDto {
  @IsNotEmpty({ message: 'projectId precisa estar preenchido' })
  @IsUUID('4', { message: 'projectId deve ser um UUID' })
  @ApiProperty({ description: 'Projeto ao qual a tarefa pertence' })
  projectId: string;
}
