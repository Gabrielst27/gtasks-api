import { ApiProperty } from '@nestjs/swagger';
import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';
import { CollaboratorRole } from 'src/domain/collaborators/enums/collaborator-role.enum';

export namespace CollaboratorResponse {
  type Props = {
    userId: string;
    role: CollaboratorRole;
    projectId: string;
  };

  export class Dto implements Props {
    @ApiProperty({ description: 'ID do usuário colaborador do projeto' })
    userId: string;

    @ApiProperty({ description: 'Role do usuário colaborador do projeto' })
    role: CollaboratorRole;

    @ApiProperty({ description: 'ID do projeto associado ao colaborador' })
    projectId: string;

    constructor(props: Props) {
      this.userId = props.userId;
      this.role = props.role;
      this.projectId = props.projectId;
    }
  }

  export class Mapper {
    static toResponse(entity: CollaboratorEntity): Dto {
      const json = entity.toJson();
      return new Dto({
        userId: json.userId,
        role: json.role,
        projectId: json.projectId,
      });
    }
  }
}
