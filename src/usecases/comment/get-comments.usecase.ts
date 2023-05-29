import { Injectable } from '@nestjs/common';
import { Comment } from 'src/core/domain/entities/comment.entity';
import { CommentRepository } from 'src/core/domain/repositories/comment.repository';

@Injectable()
export class GetCommentsUseCase {
  constructor(private readonly commentRepo: CommentRepository) {}

  async execute(): Promise<Comment[]> {
    return await this.commentRepo.getAllComments();
  }
}
