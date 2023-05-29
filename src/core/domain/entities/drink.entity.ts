import { Entity } from '../../../core/base/entity';
import { Comment } from './comment.entity';

export interface Drink extends Entity {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  isAlcoholic: boolean;
  comments?: Comment[];
}
