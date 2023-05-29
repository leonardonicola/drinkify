import { Injectable } from '@nestjs/common';
import { DrinkRepository } from '../../core/domain/repositories/drink.repository';
import { Drink } from '../../core/domain/entities/drink.entity';

@Injectable()
export class CreateDrinkUseCase {
  constructor(private readonly drinkRepo: DrinkRepository) {}

  async execute(drink: Drink): Promise<Drink> {
    return await this.drinkRepo.createDrinkRecipe(drink);
  }
}
