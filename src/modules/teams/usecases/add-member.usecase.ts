import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { TeamMemberEntity } from 'src/domain/teams/entities/member.entity';
import { MemberRole } from 'src/domain/teams/enums/member-role.enum';
import { TeamRepository } from 'src/domain/teams/repositories/team.repository';
import { MemberResponse } from 'src/modules/teams/dtos/responses/member-response.dto';

export namespace AddMember {
  export type Input = {
    userId: string;
    teamId: string;
    role?: MemberRole;
  };
  export type Output = MemberResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly repository: TeamRepository) {}

    async execute(input: Input): Promise<Output> {
      const { userId, teamId } = input;
      if (!userId || !teamId) {
        throw new BadRequestException('Dados inválidos');
      }
      const member = new TeamMemberEntity(input);
      const result = await this.repository.addMember(member);
      return MemberResponse.Mapper.toResponse(result);
    }
  }
}
