import { Drink } from '../entities/drink.entity';

export abstract class DrinkRepository {
  abstract createDrinkRecipe(drink: Omit<Drink, 'comments'>): Promise<Drink>;
  abstract getAllDrinks(): Promise<Array<Omit<Drink, 'instructions'>>>;
  abstract getDrinkById(id: string): Promise<Drink>;
  abstract updateDrinkRecipe(
    id: string,
    payload: Partial<Drink>,
  ): Promise<Drink>;
  abstract deleteDrink(id: string): Promise<Drink>;
}
