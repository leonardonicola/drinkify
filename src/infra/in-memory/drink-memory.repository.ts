import { Injectable } from '@nestjs/common';
import { Drink } from 'src/core/domain/entities/drink.entity';
import { DrinkRepository } from 'src/core/domain/repositories/drink.repository';
import { CreateDrinkDto } from 'src/shared/dtos/drink/create-drink.dto';
import { UpdateDrinkDto } from 'src/shared/dtos/drink/update-drink.dto';

@Injectable()
export class InMemoryDrinkRepository implements DrinkRepository {
  private drinks: Drink[] = [];

  async createDrinkRecipe(drink: CreateDrinkDto): Promise<Drink> {
    if (!drink.name) {
      throw new Error('Drink must have a name');
    }

    if (!drink.description) {
      throw new Error('Drink must have a description');
    }

    if (!drink.ingredients) {
      throw new Error('Drink must have ingredients');
    }

    if (!drink.instructions) {
      throw new Error('Drink must have instructions');
    }

    if (drink.isAlcoholic === undefined) {
      throw new Error('Must specify if drink is alcoholic or not');
    }

    const newDrink = {
      ...drink,
      id: (this.drinks.length + 1).toString(),
    };

    this.drinks.push(newDrink);
    return newDrink;
  }

  async getAllDrinks(): Promise<Drink[]> {
    return this.drinks;
  }

  async getDrinkById(id: string): Promise<Drink> {
    const index = this.drinks.findIndex((comment) => comment.id === id);
    if (!!id) {
      throw new Error('Id must be provided');
    }

    if (index === -1) {
      throw new Error('Drink not found');
    }

    const removedComment = this.drinks[index];
    this.drinks.splice(index, 1);
    return removedComment;
  }

  async deleteDrink(id: string): Promise<Drink> {
    if (id === undefined) {
      throw new Error('Must provide id');
    }
    const index = this.drinks.findIndex((drink) => drink.id === id);
    if (index === -1) {
      throw new Error('Drink not found');
    }

    const removedDrink = this.drinks[index];
    this.drinks.splice(index, 1);
    return removedDrink;
  }

  async updateDrinkRecipe(id: string, drink: UpdateDrinkDto): Promise<Drink> {
    if (id === undefined) {
      throw new Error('Must provide id');
    }
    const index = this.drinks.findIndex((drink) => drink.id === id);
    if (index === -1) {
      throw new Error('Drink not found');
    }

    const updatedDrink = {
      ...this.drinks[index],
      ...drink,
    };

    this.drinks[index] = updatedDrink;
    return updatedDrink;
  }

  async uploadDrinkPhoto(drinkId: string): Promise<string> {
    const index = this.drinks.findIndex((drink) => drink.id === drinkId);
    if (index === -1) {
      throw new Error('Drink not found');
    }

    return 'https://www.google.com';
  }
}
