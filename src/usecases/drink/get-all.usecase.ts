import { Injectable } from '@nestjs/common';
import { DrinkRepository } from '../../core/domain/repositories/drink.repository';
import { Drink } from '../../core/domain/entities/drink.entity';

@Injectable()
export class GetAllDrinksUseCase {
  constructor(private readonly drinkRepo: DrinkRepository) {}

  async execute(): Promise<Array<Omit<Drink, 'instructions'>>> {
    return await this.drinkRepo.getAllDrinks();
  }
}
