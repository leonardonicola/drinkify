import { Injectable } from '@nestjs/common';
import { DrinkRepository } from '../../core/domain/repositories/drink.repository';
import { GetDrinksByNameReturn } from 'src/@types';

@Injectable()
export class GetDrinkByNameUseCase {
  constructor(private readonly drinkRepo: DrinkRepository) {}

  async execute(name: string): Promise<GetDrinksByNameReturn> {
    return await this.drinkRepo.getDrinksByName(name);
  }
}
