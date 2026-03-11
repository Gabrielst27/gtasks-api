import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TeamMemberEntity } from 'src/domain/teams/entities/member.entity';
import { MemberRole } from 'src/domain/teams/enums/member-role.enum';

export namespace MemberResponse {
  type Props = {
    id: string;
    userId: string;
    teamId: string;
    role: MemberRole;
    createdAt: Date;
    updatedAt: Date;
  };

  export class Dto implements Props {
    @ApiProperty({ description: 'ID da relação entre usuário e equipe' })
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'ID do membro' })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ description: 'ID da equipe' })
    @IsNotEmpty()
    teamId: string;

    @ApiProperty({ description: 'Permissão do membro' })
    @IsNotEmpty()
    role: MemberRole;

    @ApiProperty({
      description: 'Data de criação do membro',
      format: 'date-time',
    })
    @IsNotEmpty()
    createdAt: Date;

    @ApiProperty({
      description: 'Data da última atualização do membro',
      format: 'date-time',
    })
    @IsNotEmpty()
    updatedAt: Date;

    constructor(props: Props) {
      this.id = props.id;
      this.userId = props.userId;
      this.teamId = props.teamId;
      this.role = props.role;
      this.createdAt = props.createdAt;
      this.updatedAt = props.updatedAt;
    }
  }

  export class Mapper {
    static toResponse(entity: TeamMemberEntity): Dto {
      const json = entity.toJson();
      return new Dto(json);
    }
  }
}
