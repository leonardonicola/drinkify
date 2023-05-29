import { Injectable } from '@nestjs/common';
import { Comment } from 'src/core/domain/entities/comment.entity';
import { CommentRepository } from 'src/core/domain/repositories/comment.repository';

@Injectable()
export class CreateCommentUseCase {
  constructor(private readonly commentRepo: CommentRepository) {}

  async execute(comment: Comment): Promise<Comment> {
    return await this.commentRepo.createComment(comment);
  }
}
