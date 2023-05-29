import { Injectable } from '@nestjs/common';
import { DrinkRepository } from '../../core/domain/repositories/drink.repository';
import { Drink } from '../../core/domain/entities/drink.entity';

@Injectable()
export class GetDrinkByIdUseCase {
  constructor(private readonly drinkRepo: DrinkRepository) {}

  async execute(id): Promise<Drink> {
    return await this.drinkRepo.getDrinkById(id);
  }
}
