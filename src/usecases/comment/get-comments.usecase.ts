import { Injectable } from '@nestjs/common';
import { Comment } from '../../core/domain/entities/comment.entity';
import { CommentRepository } from '../../core/domain/repositories/comment.repository';

@Injectable()
export class GetCommentsUseCase {
  constructor(private readonly commentRepo: CommentRepository) {}

  async execute(): Promise<Comment[]> {
    return await this.commentRepo.getAllComments();
  }
}
