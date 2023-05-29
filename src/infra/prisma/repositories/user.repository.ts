import { Injectable, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../../core/domain/repositories/user.repository';
import { User } from 'src/core/domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: User) {
    const user = {
      password: await bcrypt.hash(data.password, 10),
      name: data.name,
      email: data.email,
    };

    try {
      const createdUser = await this.prisma.user.create({ data: user });
      return {
        ...createdUser,
        password: undefined,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(error.name, 'Email já utilizado!');
        }
      }
    }
  }

  async getAllUsers() {
    return this.prisma.user.findMany({ orderBy: { id: 'asc' } });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { comments: true },
    });
  }

  async getUserByUnique(userWhereUniqueInput: {
    email?: string;
    id?: string;
  }): Promise<User> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  }

  async updateUserInfos(id: string, updateUser: User) {
    return this.prisma.user.update({
      where: { id },
      data: updateUser as Prisma.UserUpdateInput,
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
