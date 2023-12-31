import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/presentations/auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRepository } from 'src/core/domain/repositories/user.repository';
import { PrismaUserRepository } from '../../repositories/user.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
