import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  ProjectEntity,
  ProjectEntityProps,
} from 'src/domain/projects/entities/project.entity';

export namespace ProjectResponse {
  type Props = {
    id: string;
    name: string;
    description: string;
    createdById: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
  };

  export class Dto implements Props {
    @IsNotEmpty()
    @ApiProperty({ description: 'ID do projeto' })
    id: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Nome do projeto' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Descrição do projeto' })
    description: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Slug do projeto' })
    slug: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'ID do criador do projeto' })
    createdById: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'ID da equipe à qual o projeto pertence' })
    teamId: string;

    @IsNotEmpty()
    @ApiProperty({ format: 'date-time' })
    createdAt: string;

    @IsNotEmpty()
    @ApiProperty({ format: 'date-time' })
    updatedAt: string;

    constructor(props: Required<ProjectEntityProps & { id: string }>) {
      this.id = props.id;
      this.name = props.name;
      this.description = props.description;
      this.slug = props.slug;
      this.createdById = props.createdById;
      this.teamId = props.teamId;
      this.createdAt = props.createdAt.toISOString();
      this.updatedAt = props.updatedAt.toISOString();
    }
  }

  export class Mapper {
    static toResponse(entity: ProjectEntity): Dto {
      const json = entity.toJson();
      const response = new Dto(json);
      return response;
    }
  }
}
