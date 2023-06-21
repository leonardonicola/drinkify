import { Entity } from '../../../core/base/entity';

export interface User extends Entity {
  name: string;
  email: string;
  password: string;
}
