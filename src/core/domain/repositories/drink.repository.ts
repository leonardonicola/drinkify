import { Drink } from '../entities/drink.entity';

export interface GetDrinksParams {
  where?: { id?: string };
  orderBy?: Partial<Drink>;
}

export interface UpdateDrinksParams {
  where: { id: string };
  data: Partial<Drink>;
}

export interface CommentRepository {
  createDrinkRecipe(drink: Drink): Promise<Drink>;
  getAllDrinks(params: GetDrinksParams): Promise<Drink[]>;
  getDrinkById(id: string): Promise<Drink>;
  updateDrinkRecipe(params: UpdateDrinksParams): Promise<Drink>;
  deleteDrink(id: string): Promise<Drink>;
}
