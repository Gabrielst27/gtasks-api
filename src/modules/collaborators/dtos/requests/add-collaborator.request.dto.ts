import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { CollaboratorRole } from 'src/domain/collaborators/enums/collaborator-role.enum';

export class AddCollaboratorRequestDto {
  @IsUUID('4', { message: 'userId deve ser um UUID' })
  @IsNotEmpty({ message: 'userId não pode estar vazio' })
  userId: string;

  @IsOptional()
  @IsEnum(CollaboratorRole, {
    message: 'role deve conter um dos seguintes valores: editor, viewer, owner',
  })
  role?: CollaboratorRole;
}
