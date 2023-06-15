import { Injectable } from '@nestjs/common';
import { Comment } from 'src/core/domain/entities/comment.entity';
import { CommentRepository } from 'src/core/domain/repositories/comment.repository';

@Injectable()
export class InMemoryCommentRepository implements CommentRepository {
  private comments: Comment[] = [];

  async createComment(comment: Comment): Promise<Comment> {
    const newComment = {
      ...comment,
      id: (this.comments.length + 1).toString(),
    };
    this.comments.push(newComment);
    return newComment;
  }

  async getAllComments(): Promise<Comment[]> {
    return this.comments;
  }

  async removeComment(id: string): Promise<Comment> {
    const index = this.comments.findIndex((comment) => comment.id === id);
    if (index !== -1) {
      const [removedComment] = this.comments.splice(index, 1);
      return removedComment;
    }
  }
}
