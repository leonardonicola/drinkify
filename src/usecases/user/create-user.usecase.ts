import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { CreateUserDto } from '../../shared/dtos/user/create-user.dto';
import { User } from '../../core/domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(user: CreateUserDto): Promise<Omit<User, 'password'>> {
    return await this.userRepo.createUser(user);
  }
}
