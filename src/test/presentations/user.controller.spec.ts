import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../presentations/user.controller';
import { CreateUserUseCase } from '../../usecases/user/create-user.usecase';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { GetAllUsersUseCase } from '../../usecases/user/get-all-usecase';
import { InMemoryUserRepository } from '../../infra/in-memory/user-memory.repository';
import { UpdateUserUseCase } from '../../usecases/user/update-user.usecase';
import { DeleteUserUseCase } from '../../usecases/user/delete-user.usecase';
import { GetByUniqueUseCase } from '../../usecases/user/get-by-unique.usecase';
import { User } from 'src/core/domain/entities/user.entity';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
        GetAllUsersUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        GetByUniqueUseCase,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('SUCESS: should return an array of users', async () => {
      const user2 = {
        name: 'Jane',
        email: 'email@hotmail.com',
        password: 'ashleylookathim',
      };

      await controller.createUser(user2);

      const result = await controller.getAllUsers();

      expect(result).toEqual([{ id: '1', ...user2, password: undefined }]);
    });

    it('SUCESS: should return the user with the specified ID', async () => {
      const user: User = {
        name: 'John',
        email: 'john@example.com',
        password: 'Password123@',
      };

      await controller.createUser(user);

      const result = await controller.getUserById('1');

      expect(result).toEqual({ id: '1', ...user });
    });
  });

  describe('CREATE', () => {
    it('SUCESS: should create a new user', async () => {
      const user: User = {
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
      };

      const result = await controller.createUser(user);

      expect(result).toEqual({ id: '1', ...user, password: undefined });
    });
  });

  describe('DELETE', () => {
    it('SUCESS: should delete the user with the specified ID', async () => {
      const user: User = {
        name: 'John',
        email: 'john@example.com',
        password: 'Password123@',
      };

      await controller.createUser(user);

      const result = await controller.deleteUser('1');

      expect(result).toEqual({ id: '1', ...user });
    });
  });

  describe('UPDATE', () => {
    it('SUCESS: should update the user with the specified ID', async () => {
      const updatedInfo: Partial<User> = {
        name: 'John Doe',
        email: 'johndoe@example.com',
      };

      await controller.createUser({
        name: 'John',
        email: 'email@gmail.com',
        password: 'Password123@',
      });

      const result = await controller.updateUserInfos('1', updatedInfo);

      expect(result).toEqual({ id: '1', ...updatedInfo, password: undefined });
    });
  });
});
