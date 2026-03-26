import { ApiProperty } from '@nestjs/swagger';
import {
  CollaboratorEntity,
  CollaboratorEntityProps,
} from 'src/domain/collaborators/entities/collaborator.entity';
import { CollaboratorRole } from 'src/domain/collaborators/enums/collaborator-role.enum';

export namespace CollaboratorResponse {
  type Props = Required<CollaboratorEntityProps>;

  export class Dto implements Props {
    @ApiProperty({ description: 'ID do usuário colaborador do projeto' })
    userId: string;

    @ApiProperty({ description: 'Role do usuário colaborador do projeto' })
    role: CollaboratorRole;

    @ApiProperty({ description: 'ID do projeto associado ao colaborador' })
    projectId: string;

    @ApiProperty({
      description: 'Data de associação do colaborador ao projeto',
    })
    createdAt: Date;

    @ApiProperty({
      description: 'Data da última atualização do colaborador no projeto',
    })
    updatedAt: Date;

    constructor(props: Props) {
      this.userId = props.userId;
      this.role = props.role;
      this.projectId = props.projectId;
      this.createdAt = props.createdAt;
      this.updatedAt = props.updatedAt;
    }
  }

  export class Mapper {
    static toResponse(entity: CollaboratorEntity): Dto {
      const json = entity.toJson();
      return new Dto({
        userId: json.userId,
        role: json.role,
        projectId: json.projectId,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt,
      });
    }
  }
}
