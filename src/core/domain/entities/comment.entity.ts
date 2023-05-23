import { Entity } from '../../../core/base/entity';
import { Drink } from './drink.entity';
import { User } from './user.entity';

export interface Comment extends Entity {
  text: string;
  drink: Drink;
  user: User;
}
