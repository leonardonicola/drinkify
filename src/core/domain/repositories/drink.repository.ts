import { GetAllReturn } from 'src/@types';
import { Drink } from '../entities/drink.entity';

export abstract class DrinkRepository {
  abstract uploadDrinkPhoto(drinkId: string, file: unknown): Promise<string>;
  abstract createDrinkRecipe(drink: Omit<Drink, 'comments'>): Promise<Drink>;
  abstract getAllDrinks(isAlcoholic?: boolean): Promise<GetAllReturn>;
  abstract getDrinkById(id: string): Promise<Drink>;
  abstract updateDrinkRecipe(
    id: string,
    payload: Partial<Drink>,
  ): Promise<Drink>;
  abstract deleteDrink(id: string): Promise<Drink>;
}
