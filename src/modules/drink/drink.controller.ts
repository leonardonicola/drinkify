import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { DrinkService } from './drink.service';
import { Drink } from '@prisma/client';
import { CreateDrinkDto } from '../../shared/dtos/drink/create-drink.dto';
import { UpdateDrinkDto } from '../../shared/dtos/drink/update-drink.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('drink')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Post()
  createDrinkRecipe(@Body() createDrinkDto: CreateDrinkDto): Promise<Drink> {
    return this.drinkService.createDrinkRecipe(createDrinkDto);
  }

  @IsPublic()
  @Get()
  getAllDrinks(): Promise<Drink[] | null> {
    return this.drinkService.getAllDrinks({ take: 10 });
  }

  @IsPublic()
  @Get(':id')
  getDrinkById(@Param('id') id: string): Promise<Drink> {
    return this.drinkService.getDrinkById(id);
  }

  @Put(':id')
  updateDrinkRecipe(
    @Param('id') id: string,
    @Body() updateDrinkDto: UpdateDrinkDto,
  ): Promise<Drink> {
    return this.drinkService.updateDrinkRecipe({
      data: updateDrinkDto,
      where: { id },
    });
  }

  @Delete(':id')
  deleteDrink(@Param('id') id: string): Promise<Drink> {
    return this.drinkService.deleteDrink({ id });
  }
}
