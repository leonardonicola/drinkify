import { Injectable } from '@nestjs/common';
import { DrinkRepository } from '../../core/domain/repositories/drink.repository';
import { GetAllReturn } from 'src/@types';

@Injectable()
export class GetAllDrinksUseCase {
  constructor(private readonly drinkRepo: DrinkRepository) {}

  async execute(isAlcoholic?: boolean): Promise<GetAllReturn> {
    return await this.drinkRepo.getAllDrinks(isAlcoholic);
  }
}
