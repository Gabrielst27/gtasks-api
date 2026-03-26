import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CommentEntity } from 'src/domain/comments/entities/comment.entity';

export namespace CommentsResponse {
  type Props = {
    content: string;
    authorId: string;
    taskId: string;
    createdAt: Date;
    updatedAt: Date;
  };

  export class Dto implements Props {
    @IsNotEmpty()
    @ApiProperty({ description: 'Conteúdo do comentário' })
    content: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'ID do autor do comentário' })
    authorId: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'ID da tarefa à qual o comentário pertence' })
    taskId: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Data de criação do comentário' })
    createdAt: Date;

    @IsNotEmpty()
    @ApiProperty({ description: 'Data da última atualização do comentário' })
    updatedAt: Date;

    constructor(props: Props) {
      this.content = props.content;
      this.authorId = props.authorId;
      this.taskId = props.taskId;
      this.createdAt = props.createdAt;
      this.updatedAt = props.updatedAt;
    }
  }

  export class Mapper {
    static entityToResponse(entity: CommentEntity): Dto {
      const json = entity.toJson();
      return new Dto(json);
    }
  }
}
