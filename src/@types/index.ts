import { Drink } from 'src/core/domain/entities/drink.entity';

export type GetAlcoholicsReturnType = Array<
  Omit<Drink, 'instructions' | 'isAlcoholic'>
>;

export type GetAllReturn = Array<Omit<Drink, 'instructions'>>;
