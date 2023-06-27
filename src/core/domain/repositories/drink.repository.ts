import {
  GetAlcoholicsReturnType,
  GetAllReturn,
  GetByNameAndAlcoholicReturn,
  GetDrinksByNameReturn,
} from 'src/@types';
import { Drink } from '../entities/drink.entity';

export abstract class DrinkRepository {
  abstract uploadDrinkPhoto(drinkId: string, file: unknown): Promise<string>;
  abstract createDrinkRecipe(drink: Omit<Drink, 'comments'>): Promise<Drink>;
  abstract getAllDrinks(): Promise<GetAllReturn>;
  abstract getAlcoholicDrinks(
    isAlcoholic: boolean,
  ): Promise<GetAlcoholicsReturnType>;
  abstract getDrinksByName(name: string): Promise<GetDrinksByNameReturn>;
  abstract getByNameAndAlcoholic(
    isAlcoholic: boolean,
    name: string,
  ): Promise<GetByNameAndAlcoholicReturn>;
  abstract getDrinkById(id: string): Promise<Drink>;
  abstract updateDrinkRecipe(
    id: string,
    payload: Partial<Drink>,
  ): Promise<Drink>;
  abstract deleteDrink(id: string): Promise<Drink>;
}
