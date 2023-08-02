import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Comment } from 'src/core/domain/entities/comment.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CommentRepository } from 'src/core/domain/repositories/comment.repository';

@Injectable()
export class PrismaCommentRepository implements CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(comment: Comment) {
    try {
      const result = await this.prisma.comment.create({
        data: comment as Prisma.CommentCreateInput,
        include: { Drink: true, User: true },
      });
      return result;
    } catch (error) {
      Logger.log(error);
    }
  }

  async getAllComments() {
    const result = await this.prisma.comment.findMany({
      orderBy: { id: 'asc' },
    });
    return result;
  }

  async removeComment(id: string) {
    try {
      const result = await this.prisma.comment.delete({ where: { id } });
      return result;
    } catch (error) {
      Logger.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new NotFoundException(error.name, 'O comentário não existe!');
        }
      }
    }
  }
}
