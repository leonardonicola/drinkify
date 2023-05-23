import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { User } from '../../core/domain/entities/user.entity';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepo.getAllUsers();
  }
}
