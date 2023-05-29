import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Drink } from 'src/core/domain/entities/drink.entity';
import { PrismaService } from './prisma.service';
import { DrinkRepository } from 'src/core/domain/repositories/drink.repository';

@Injectable()
export class PrismaDrinkRepository implements DrinkRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDrinkRecipe(data: Drink) {
    return this.prisma.drink.create({ data: data as Prisma.DrinkCreateInput });
  }

  async getAllDrinks() {
    return this.prisma.drink.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        ingredients: true,
        isAlcoholic: true,
      },
    });
  }

  async getDrinkById(id: string) {
    return this.prisma.drink.findUnique({
      where: { id },
      include: { comments: true },
    });
  }

  async updateDrinkRecipe(id: string, updatedDrink: Drink) {
    return this.prisma.drink.update({
      where: { id },
      data: updatedDrink as Prisma.DrinkUpdateInput,
    });
  }

  async deleteDrink(id: string) {
    return this.prisma.drink.delete({ where: { id } });
  }
}
