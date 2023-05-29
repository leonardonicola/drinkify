import { Injectable } from '@nestjs/common';
import { Comment } from 'src/core/domain/entities/comment.entity';
import { CommentRepository } from 'src/core/domain/repositories/comment.repository';

@Injectable()
export class RemoveCommentUseCase {
  constructor(private readonly commentRepo: CommentRepository) {}

  async execute(id: string): Promise<Comment> {
    return await this.commentRepo.removeComment(id);
  }
}
