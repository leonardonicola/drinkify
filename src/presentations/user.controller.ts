import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from '../shared/dtos/user/create-user.dto';
import { UpdateUserDto } from '../shared/dtos/user/update-user.dto';
import { IsPublic } from '../modules/auth/decorators/is-public.decorator';
import { CreateUserUseCase } from 'src/usecases/user/create-user.usecase';
import { GetAllUsersUseCase } from 'src/usecases/user/get-all-usecase';
import { UpdateUserUseCase } from 'src/usecases/user/update-user.usecase';
import { DeleteUserUseCase } from 'src/usecases/user/delete-user.usecase';
import { GetByUniqueUseCase } from 'src/usecases/user/get-by-unique.usecase';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserByUniqueUseCase: GetByUniqueUseCase,
  ) {}

  @IsPublic()
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.getAllUsersUseCase.execute();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.getUserByUniqueUseCase.execute({ id });
  }

  @Put(':id')
  updateUserInfos(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }

  @IsPublic()
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }
}
