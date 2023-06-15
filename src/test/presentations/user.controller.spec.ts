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
  let createUserUseCase: CreateUserUseCase;
  let getAllUserUseCase: GetAllUsersUseCase;
  let deleteUserUseCase: DeleteUserUseCase;
  let getByUniqueUseCase: GetByUniqueUseCase;
  let updateUserUseCase: UpdateUserUseCase;

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
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    getAllUserUseCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    getByUniqueUseCase = module.get<GetByUniqueUseCase>(GetByUniqueUseCase);
    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const user1 = {
        id: '1',
        name: 'John',
        email: 'email@gmail.com',
        password: 'ashleylookatme',
      };
      const user2 = {
        id: '2',
        name: 'Jane',
        email: 'email@hotmail.com',
        password: 'ashleylookathim',
      };

      const getAllUserSpy = jest
        .spyOn(getAllUserUseCase, 'execute')
        .mockResolvedValueOnce([user1, user2]);

      const result = await controller.getAllUsers();

      expect(result).toEqual([user1, user2]);
      expect(getAllUserSpy).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return the user with the specified ID', async () => {
      const user: User = {
        id: '1',
        name: 'John',
        email: 'john@example.com',
        password: 'Password123@',
      };

      const getUserSpy = jest
        .spyOn(getByUniqueUseCase, 'execute')
        .mockResolvedValueOnce(user);

      const result = await controller.getUserById('1');

      expect(result).toEqual(user);
      expect(getUserSpy).toHaveBeenCalledWith({ id: '1' });
    });

    it('should return undefined if user is not found', async () => {
      const getUserSpy = jest
        .spyOn(getByUniqueUseCase, 'execute')
        .mockResolvedValueOnce(undefined);

      const result = await controller.getUserById('1');

      expect(result).toBeUndefined();
      expect(getUserSpy).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user: User = {
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
      };
      const createdUser: User = {
        id: '1',
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
      };

      const createUserSpy = jest
        .spyOn(createUserUseCase, 'execute')
        .mockResolvedValueOnce(createdUser);

      const result = await controller.createUser(user);

      expect(result).toEqual(createdUser);
      expect(createUserSpy).toHaveBeenCalledWith(user);
    });
  });

  describe('deleteUser', () => {
    it('should delete the user with the specified ID', async () => {
      const user: User = {
        id: '1',
        name: 'John',
        email: 'john@example.com',
        password: 'Password123@',
      };

      jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValueOnce(user);

      const result = await controller.deleteUser('1');

      expect(result).toEqual(user);
    });

    it('should return undefined if user is not found', async () => {
      jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValueOnce(undefined);

      const result = await controller.deleteUser('1');

      expect(result).toBeUndefined();
    });
  });

  describe('updateUser', () => {
    it('should update the user with the specified ID', async () => {
      const updatedInfo: Partial<User> = {
        name: 'John Doe',
        email: 'johndoe@example.com',
      };
      const updatedUser: User = {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      const updateSpy = jest
        .spyOn(updateUserUseCase, 'execute')
        .mockResolvedValueOnce(updatedUser);

      const result = await controller.updateUserInfos('1', updatedInfo);

      expect(result).toEqual(updatedUser);
      expect(updateSpy).toHaveBeenCalledWith('1', updatedInfo);
    });

    it('should return undefined if user is not found', async () => {
      const updatedInfo: Partial<User> = {
        name: 'John Doe',
        email: 'johndoe@example.com',
      };

      const updateSpy = jest
        .spyOn(updateUserUseCase, 'execute')
        .mockResolvedValueOnce(undefined);

      const result = await controller.updateUserInfos('1', updatedInfo);

      expect(result).toBeUndefined();
      expect(updateSpy).toHaveBeenCalledWith('1', updatedInfo);
    });
  });
});
