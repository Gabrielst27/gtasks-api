import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

enum AddMemberRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export class AddMemberRequestDto {
  @IsUUID('4', { message: 'userId deve ser do tipo UUID' })
  @IsNotEmpty({ message: 'userId não pode estar vazio' })
  userId: string;

  @IsEnum(AddMemberRole, {
    message: 'role deve ser um entre os seguintes valores: admin, member',
  })
  @IsOptional()
  role?: AddMemberRole;
}
