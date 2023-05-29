import { Module } from '@nestjs/common';
import { CommentController } from 'src/presentations/comment.controller';
import { PrismaService } from 'src/infra/prisma/repositories/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CommentRepository } from 'src/core/domain/repositories/comment.repository';
import { PrismaCommentRepository } from 'src/infra/prisma/repositories/comment.repository';
import { CreateCommentUseCase } from 'src/usecases/comment/create-comment.usecase';
import { RemoveCommentUseCase } from 'src/usecases/comment/remove-comment.usecase';
import { GetCommentsUseCase } from 'src/usecases/comment/get-comments.usecase';

@Module({
  controllers: [CommentController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: CommentRepository,
      useClass: PrismaCommentRepository,
    },
    CreateCommentUseCase,
    RemoveCommentUseCase,
    GetCommentsUseCase,
  ],
})
export class CommentModule {}
