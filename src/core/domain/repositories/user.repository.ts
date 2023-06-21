import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract createUser(user: User): Promise<Omit<User, 'password'>>;
  abstract getAllUsers(): Promise<Array<Omit<User, 'password'>>>;
  abstract getUserByUnique({
    id,
    email,
  }: {
    id?: string;
    email?: string;
  }): Promise<User>;
  abstract updateUserInfos(
    id: string,
    updatedUser: Partial<User>,
  ): Promise<User>;
  abstract deleteUser(id: string): Promise<User>;
}
