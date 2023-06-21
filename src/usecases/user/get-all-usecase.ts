import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { User } from '../../core/domain/entities/user.entity';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(): Promise<Array<Omit<User, 'password'>>> {
    return await this.userRepo.getAllUsers();
  }
}
