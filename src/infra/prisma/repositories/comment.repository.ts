import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Comment } from 'src/core/domain/entities/comment.entity';
import { PrismaService } from './prisma.service';
import { CommentRepository } from 'src/core/domain/repositories/comment.repository';

@Injectable()
export class PrismaCommentRepository implements CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(comment: Comment) {
    return this.prisma.comment.create({
      data: comment as Prisma.CommentCreateInput,
      include: { Drink: true, User: true },
    });
  }

  async getAllComments() {
    return this.prisma.comment.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async removeComment(id: string) {
    return this.prisma.comment.delete({ where: { id } });
  }
}
