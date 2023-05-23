import { Entity } from '../../../core/base/entity';
import { Comment } from './comment.entity';

export interface User extends Entity {
  name: string;
  email: string;
  password: string;
  comments?: Comment[];
}
