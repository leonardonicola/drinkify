import { Injectable } from '@nestjs/common';
import { User } from 'src/core/domain/entities/user.entity';
import { UserRepository } from 'src/core/domain/repositories/user.repository';
import { CreateUserDto } from 'src/shared/dtos/user/create-user.dto';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async getAllUsers(): Promise<Array<Omit<User, 'password'>>> {
    const users = this.users.map((user) => {
      delete user.password;
      return user;
    });

    return users;
  }

  async getUserByUnique({
    id,
    email,
  }: {
    id?: string;
    email?: string;
  }): Promise<User> {
    if (!id && !email) {
      throw new Error('ID or Email is required');
    }
    const index = this.users.findIndex(
      (user) => user.id === id || user.email === email,
    );

    if (index === -1) {
      throw new Error('User not found');
    }

    return this.users[index];
  }

  async createUser(user: CreateUserDto): Promise<Omit<User, 'password'>> {
    if (this.users.find((u) => u.email === user.email)) {
      throw new Error('Email already in use');
    }

    if (!user.email) {
      throw new Error('Email is required');
    }

    if (!user.password) {
      throw new Error('Password is required');
    }

    if (!user.name) {
      throw new Error('Name is required');
    }

    const newUser = {
      id: (this.users.length + 1).toString(),
      ...user,
    };
    this.users.push(newUser);
    delete newUser.password;
    return newUser;
  }

  async deleteUser(id: string): Promise<User | undefined> {
    if (!id) {
      throw new Error('ID is required');
    }
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser;
  }

  async updateUserInfos(
    id: string,
    updatedInfo: UpdateUserDto,
  ): Promise<User | undefined> {
    if (!id) {
      throw new Error('ID is required');
    }
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = { ...this.users[userIndex], ...updatedInfo };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
}
