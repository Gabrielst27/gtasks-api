import { ConflictException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { CommentEntity } from 'src/domain/comments/entities/comment.entity';
import { CommentRepository } from 'src/domain/comments/repositories/comment.repository';
import { CommentsPrismaModelMapper } from 'src/modules/comments/repositories/prisma/comments-prisma-model.mapper';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';

export class CommentsPrismaRepository extends CommentRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  findById(id: string): Promise<CommentEntity> {
    throw new Error('Method not implemented.');
  }

  findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<CommentEntity>> {
    throw new Error('Method not implemented.');
  }

  async create(item: CommentEntity): Promise<CommentEntity> {
    const model = CommentsPrismaModelMapper.toModel(item);
    try {
      await this.prismaService.comment.create({ data: model });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Comentário já registrado');
      }
      throw new Error('[ERR-003]: Erro desconhecido');
    }
    return item;
  }

  update(id: string, item: CommentEntity): Promise<CommentEntity> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<CommentEntity> {
    throw new Error('Method not implemented.');
  }
}
