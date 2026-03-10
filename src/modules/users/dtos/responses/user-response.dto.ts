import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import {
  UserEntity,
  UserEntityProps,
} from 'src/domain/users/entities/user-entity';

export namespace UserResponse {
  type Props = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    disabledAt: string;
  };

  export class Dto implements Props {
    @IsNotEmpty()
    @ApiProperty({ description: 'ID do usuário' })
    id: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Nome do usuário' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Email do usuário' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Url da imagem de avatar do usuário' })
    avatar: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Data de criação do usuário' })
    createdAt: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Data da última atualização do usuário' })
    updatedAt: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Data da última atualização do usuário' })
    disabledAt: string;

    constructor(props: Required<UserEntityProps & { id: string }>) {
      this.id = props.id;
      this.name = props.name;
      this.email = props.email;
      this.avatar = props.avatar ?? '';
      this.createdAt = props.createdAt.toISOString();
      this.updatedAt = props.createdAt.toISOString();
      this.disabledAt = props.disabledAt ? props.disabledAt.toISOString() : '';
    }
  }

  export class Mapper {
    static toResponse(entity: UserEntity): Dto {
      const json = entity.toJson();
      const dto = new Dto(json);
      return dto;
    }
  }
}
