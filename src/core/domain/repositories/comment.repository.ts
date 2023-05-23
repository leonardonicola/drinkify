import { Comment } from '../entities/comment.entity';

export interface GetCommentsParams {
  where?: { id?: string };
  orderBy?: Partial<Comment>;
}

export interface CommentRepository {
  createComment(comment: Comment): Promise<Comment>;
  getAllComments(params: GetCommentsParams): Promise<Comment[]>;
  removeComment(id: string): Promise<Comment>;
}
