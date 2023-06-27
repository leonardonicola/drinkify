import { Injectable } from '@nestjs/common';
import { DrinkRepository } from '../../core/domain/repositories/drink.repository';
import { GetAlcoholicsReturnType } from 'src/@types';

@Injectable()
export class GetAlcoholicDrinksUseCase {
  constructor(private readonly drinkRepo: DrinkRepository) {}

  async execute(isAlcoholic: boolean): Promise<GetAlcoholicsReturnType> {
    return await this.drinkRepo.getAlcoholicDrinks(isAlcoholic);
  }
}
