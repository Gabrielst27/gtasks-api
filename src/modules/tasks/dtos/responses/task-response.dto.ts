import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  TaskEntity,
  TaskEntityProps,
} from 'src/domain/tasks/entities/task-entity';
import { TaskPriority } from 'src/domain/tasks/enums/priority';
import { TaskStatus } from 'src/domain/tasks/enums/status';

export namespace TaskResponse {
  type Props = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    projectId: string;
    createdAt: string;
    updatedAt: string;
  };

  export class Dto implements Props {
    @IsNotEmpty()
    @ApiProperty({ description: 'Id da tarefa' })
    id: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Título da tarefa' })
    title: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Descrição da tarefa' })
    description: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Slug do projeto' })
    slug: string;

    @IsNotEmpty()
    @ApiProperty({
      description: 'Status da tarefa',
      enum: TaskStatus,
      default: TaskStatus.TO_DO,
    })
    status: TaskStatus;

    @IsNotEmpty()
    @ApiProperty({
      description: 'Prioridade da tarefa',
      enum: TaskPriority,
      default: TaskPriority.LOW,
    })
    priority: TaskPriority;

    @IsNotEmpty()
    @ApiProperty({
      description: 'Data de vencimento da tarefa',
      format: 'date-time',
    })
    dueDate: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Projeto ao qual a tarefa pertence' })
    projectId: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'ID do colaborador responsável pela tarefa' })
    assigneeId: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'ID do criador da tarefa' })
    createdById: string;

    @IsNotEmpty()
    @ApiProperty({
      description: 'Data de criação da tarefa',
      format: 'date-time',
    })
    createdAt: string;

    @IsNotEmpty()
    @ApiProperty({
      description: 'Data da última atualização da tarefa',
      format: 'date-time',
    })
    updatedAt: string;

    constructor(props: Required<TaskEntityProps & { id: string }>) {
      this.id = props.id;
      this.title = props.title;
      this.description = props.description;
      this.status = props.status;
      this.priority = props.priority;
      this.projectId = props.projectId;
      this.createdAt = props.createdAt.toISOString();
      this.updatedAt = props.updatedAt.toISOString();
      this.dueDate = props.dueDate ? props.dueDate.toISOString() : '';
    }
  }

  export class Mapper {
    static toResponse(entity: TaskEntity): Dto {
      const json = entity.toJson();
      const dto = new Dto(json);
      return dto;
    }
  }
}
