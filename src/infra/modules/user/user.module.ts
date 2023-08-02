import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserController } from 'src/presentations/user.controller';
import { PrismaUserRepository } from '../../repositories/user.repository';
import { CreateUserUseCase } from 'src/usecases/user/create-user.usecase';
import { UpdateUserUseCase } from 'src/usecases/user/update-user.usecase';
import { DeleteUserUseCase } from 'src/usecases/user/delete-user.usecase';
import { GetAllUsersUseCase } from 'src/usecases/user/get-all-usecase';
import { GetByUniqueUseCase } from 'src/usecases/user/get-by-unique.usecase';
import { UserRepository } from 'src/core/domain/repositories/user.repository';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetAllUsersUseCase,
    GetByUniqueUseCase,
  ],
})
export class UserModule {}
