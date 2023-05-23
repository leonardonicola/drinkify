import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { User } from '../../core/domain/entities/user.entity';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string): Promise<User> {
    return await this.userRepo.deleteUser(id);
  }
}
