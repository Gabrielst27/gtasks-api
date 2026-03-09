import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TeamEntity } from 'src/domain/teams/entities/team.entity';
import { Plan } from 'src/domain/plans/enums/plan.enum';

export namespace TeamResponse {
  type Props = {
    name: string;
    slug: string;
    plan: Plan;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
  };

  export class Dto implements Props {
    @IsNotEmpty()
    @ApiProperty({ description: 'Nome da equipe' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Slug da equipe' })
    slug: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Plano de assinatura da equipe' })
    plan: Plan;

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
      this.name = props.name;
      this.slug = props.slug;
      this.plan = props.plan;
      this.createdById = props.createdById;
      this.createdAt = props.createdAt;
      this.updatedAt = props.updatedAt;
    }
  }

  export class Mapper {
    static entityToResponse(entity: TeamEntity): Dto {
      return entity.toJson();
    }
  }
}
