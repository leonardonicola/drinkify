import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract createUser(user: User): Promise<User>;
  abstract getAllUsers(): Promise<User[]>;
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
