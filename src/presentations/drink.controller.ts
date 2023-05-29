import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDrinkDto } from '../shared/dtos/drink/create-drink.dto';
import { UpdateDrinkDto } from '../shared/dtos/drink/update-drink.dto';
import { IsPublic } from '../infra/modules/auth/decorators/is-public.decorator';
import { CreateDrinkUseCase } from 'src/usecases/drink/create-drink.usecase';
import { UpdateDrinkUseCase } from 'src/usecases/drink/update-drink.usecase';
import { GetDrinkByIdUseCase } from 'src/usecases/drink/get-by-id.usecase';
import { GetAllDrinksUseCase } from 'src/usecases/drink/get-all.usecase';
import { DeleteDrinkUseCase } from 'src/usecases/drink/delete-drink.usecase';

@Controller('drink')
export class DrinkController {
  constructor(
    private readonly createDrinkUseCase: CreateDrinkUseCase,
    private readonly updateDrinkUseCase: UpdateDrinkUseCase,
    private readonly getDrinkByIdUseCase: GetDrinkByIdUseCase,
    private readonly getAllDrinksUseCase: GetAllDrinksUseCase,
    private readonly deleteDrinkUseCase: DeleteDrinkUseCase,
  ) {}

  @Post()
  createDrinkRecipe(@Body() createDrinkDto: CreateDrinkDto) {
    return this.createDrinkUseCase.execute(createDrinkDto);
  }

  @IsPublic()
  @Get()
  getAllDrinks() {
    return this.getAllDrinksUseCase.execute();
  }

  @IsPublic()
  @Get(':id')
  getDrinkById(@Param('id') id: string) {
    return this.getDrinkByIdUseCase.execute(id);
  }

  @Put(':id')
  updateDrinkRecipe(
    @Param('id') id: string,
    @Body() updateDrinkDto: UpdateDrinkDto,
  ) {
    return this.updateDrinkUseCase.execute(id, updateDrinkDto);
  }

  @Delete(':id')
  deleteDrink(@Param('id') id: string) {
    return this.deleteDrinkUseCase.execute(id);
  }
}
