import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { User } from '../../core/domain/entities/user.entity';

@Injectable()
export class GetByUniqueUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute({ id, email }: { id?: string; email?: string }): Promise<User> {
    return await this.userRepo.getUserByUnique({ id, email });
  }
}
