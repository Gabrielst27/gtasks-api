import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentRepository } from 'src/domain/comments/repositories/comment.repository';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { CommentsPrismaRepository } from 'src/modules/comments/repositories/prisma/comments-prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new CommentsPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: CommentsService,
      useFactory: (repository: CommentRepository) => {
        return new CommentsService(repository);
      },
      inject: ['Repository'],
    },
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
