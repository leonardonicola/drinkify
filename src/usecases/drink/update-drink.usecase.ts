import { Injectable } from '@nestjs/common';
import { DrinkRepository } from '../../core/domain/repositories/drink.repository';
import { Drink } from '../../core/domain/entities/drink.entity';

@Injectable()
export class UpdateDrinkUseCase {
  constructor(private readonly drinkRepo: DrinkRepository) {}

  async execute(id: string, updatedRecipe: Partial<Drink>): Promise<Drink> {
    return await this.drinkRepo.updateDrinkRecipe(id, updatedRecipe);
  }
}
