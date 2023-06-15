import { Injectable } from '@nestjs/common';
import { User } from 'src/core/domain/entities/user.entity';
import { UserRepository } from 'src/core/domain/repositories/user.repository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserByUnique({
    id,
    email,
  }: {
    id?: string;
    email?: string;
  }): Promise<User | undefined> {
    return this.users.find((user) => user.id === id || user.email === email);
  }

  async createUser(user: User): Promise<User> {
    const newUser = { ...user, id: (this.users.length + 1).toString() };
    this.users.push(newUser);
    return newUser;
  }

  async deleteUser(id: string): Promise<User | undefined> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const [deletedUser] = this.users.splice(index, 1);
      return deletedUser;
    }
    return undefined;
  }

  async updateUserInfos(
    id: string,
    updatedInfo: Partial<User>,
  ): Promise<User | undefined> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const updatedUser = { ...this.users[userIndex], ...updatedInfo };
      this.users[userIndex] = updatedUser;
      return updatedUser;
    }
    return undefined;
  }
}
