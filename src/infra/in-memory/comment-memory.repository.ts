import { Injectable } from '@nestjs/common';
import { Comment } from 'src/core/domain/entities/comment.entity';
import { CommentRepository } from 'src/core/domain/repositories/comment.repository';

@Injectable()
export class InMemoryCommentRepository implements CommentRepository {
  private comments: Comment[] = [];

  async createComment(comment: Comment): Promise<Comment> {
    if (!comment.text) {
      throw new Error('Comment must have a text');
    }

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
    if (index === -1) {
      throw new Error('Comment not found');
    }

    const removedComment = this.comments[index];
    this.comments.splice(index, 1);
    return removedComment;
  }
}
