import { Comment } from '../entities/comment.entity';

export abstract class CommentRepository {
  abstract createComment(comment: Comment): Promise<Comment>;
  abstract getAllComments(): Promise<Comment[]>;
  abstract removeComment(id: string): Promise<Comment>;
}
