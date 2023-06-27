import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../infra/modules/auth/auth.service';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { InMemoryUserRepository } from '../../infra/in-memory/user-memory.repository';
import { User } from '../../core/domain/entities/user.entity';

describe('Authentication', () => {
  let authenticationService: AuthService;
  let userRepo: UserRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
      imports: [
        JwtModule.register({
          secretOrPrivateKey: 'Secret key',
        }),
      ],
    }).compile();

    userRepo = module.get<UserRepository>(UserRepository);
    authenticationService = module.get<AuthService>(AuthService);
  });
  describe('when the validateUser method is called', () => {
    describe('and a valid email and password are provided', () => {
      let userData: User;
      let password: string;
      beforeEach(async () => {
        password = 'Abc123!@#';
        const hashedPassword = await bcrypt.hash(password, 10);
        userData = {
          name: 'Test',
          email: 'email@gmail.com',
          password: hashedPassword,
        };

        jest.spyOn(userRepo, 'getUserByUnique').mockResolvedValueOnce(userData);
      });
      it('should return the new user', async () => {
        const result = await authenticationService.validateUser(
          userData.email,
          password,
        );
        expect(result).toEqual({
          ...userData,
          password: undefined,
        });
      });
    });
  });
  describe('when the login method is called', () => {
    describe('and a valid user is provided', () => {
      const userData = {
        id: '1',
        name: 'Test',
        email: 'email@gmail.com',
        password: undefined,
      };

      it('should return a token', async () => {
        const result = await authenticationService.login(userData);
        expect(result).toEqual({
          access_token: expect.any(String),
        });
      });
    });
  });
});
