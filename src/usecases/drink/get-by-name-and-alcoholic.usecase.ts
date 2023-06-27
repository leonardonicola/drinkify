import { Injectable } from '@nestjs/common';
import { DrinkRepository } from '../../core/domain/repositories/drink.repository';
import { GetAlcoholicsReturnType } from 'src/@types';

@Injectable()
export class GetByNameAndAlcoholicUseCase {
  constructor(private readonly drinkRepo: DrinkRepository) {}

  async execute(
    isAlcoholic: boolean,
    name: string,
  ): Promise<GetAlcoholicsReturnType> {
    return await this.drinkRepo.getByNameAndAlcoholic(isAlcoholic, name);
  }
}
