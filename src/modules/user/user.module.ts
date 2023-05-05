import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
