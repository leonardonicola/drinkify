import { Injectable } from '@nestjs/common';
import { Prisma, Drink } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class DrinkService {
  constructor(private readonly prisma: PrismaService) {}

  async createDrinkRecipe(data: Prisma.DrinkCreateInput): Promise<Drink> {
    return this.prisma.drink.create({ data });
  }

  async getAllDrinks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DrinkWhereUniqueInput;
    where?: Prisma.DrinkWhereUniqueInput;
    orderBy?: Prisma.DrinkOrderByWithRelationInput;
  }): Promise<Drink[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.drink.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getDrinkById(id: string): Promise<Drink> {
    return this.prisma.drink.findUnique({ where: { id } });
  }

  async updateDrinkRecipe(params: {
    where: Prisma.DrinkWhereUniqueInput;
    data: Prisma.DrinkUpdateInput;
  }): Promise<Drink> {
    const { where, data } = params;
    return this.prisma.drink.update({ where, data });
  }

  async deleteDrink(where: Prisma.DrinkWhereUniqueInput): Promise<Drink> {
    return this.prisma.drink.delete({ where });
  }
}
