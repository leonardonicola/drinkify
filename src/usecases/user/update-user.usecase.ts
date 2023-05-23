import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { User } from '../../core/domain/entities/user.entity';
import { UpdateUserDto } from '../../shared/dtos/user/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string, user: UpdateUserDto): Promise<User> {
    return await this.userRepo.updateUserInfos(id, user);
  }
}
