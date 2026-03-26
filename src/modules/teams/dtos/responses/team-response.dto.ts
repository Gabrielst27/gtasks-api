import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TeamEntity } from 'src/domain/teams/entities/team.entity';
import { TeamMemberEntity } from 'src/domain/teams/entities/member.entity';
import { MemberResponse } from 'src/modules/teams/dtos/responses/member-response.dto';

export namespace TeamResponse {
  type Props = {
    id: string;
    name: string;
    slug: string;
    planId: string;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
  };

  export class Dto implements Props {
    @IsNotEmpty()
    @ApiProperty({ description: 'ID da equipe' })
    id: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'ID do plano de assinatura da equipe' })
    planId: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Nome da equipe' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Slug da equipe' })
    slug: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'ID do criador da equipe' })
    createdById: string;

    @IsNotEmpty()
    @ApiProperty({
      description: 'Data em que a equipe foi criada',
      format: 'date-time',
    })
    createdAt: Date;

    @IsNotEmpty()
    @ApiProperty({
      description: 'Data da última atualização dos dados da equipe',
      format: 'date-time',
    })
    updatedAt: Date;

    constructor(props: Props) {
      this.id = props.id;
      this.name = props.name;
      this.slug = props.slug;
      this.planId = props.planId;
      this.createdById = props.createdById;
      this.createdAt = props.createdAt;
      this.updatedAt = props.updatedAt;
    }
  }

  export class Mapper {
    static entityToResponse(entity: TeamEntity): Dto {
      return new Dto(entity.toJson());
    }

    static entityToMembership(
      result: {
        team: TeamEntity;
      } & {
        membership: TeamMemberEntity;
      },
    ): { team: TeamResponse.Dto } & { membership: MemberResponse.Dto } {
      const { team, ...memberProps } = result;
      const teamResponse = Mapper.entityToResponse(team);
      const memberResponse = MemberResponse.Mapper.toResponse(
        memberProps.membership,
      );
      return { team: teamResponse, membership: memberResponse };
    }
  }
}
