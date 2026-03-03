import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { CollaboratorRole } from 'src/domain/collaborators/enums/collaborator-role.enum';

export class AddCollaboratorRequestDto {
  @ApiProperty({
    description: 'ID do usuário a ser adicionado como colaborador',
  })
  @IsUUID('4', { message: 'userId deve ser um UUID' })
  @IsNotEmpty({ message: 'userId não pode estar vazio' })
  userId: string;

  @ApiProperty({
    description: 'Role do usuário a ser adicionado como colaborador',
    required: false,
    enum: CollaboratorRole,
    default: CollaboratorRole.VIEWER,
  })
  @IsOptional()
  @IsEnum(CollaboratorRole, {
    message: 'role deve conter um dos seguintes valores: editor, viewer, owner',
  })
  role?: CollaboratorRole;
}
