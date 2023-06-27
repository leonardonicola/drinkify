import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Drink } from 'src/core/domain/entities/drink.entity';
import { PrismaService } from './prisma.service';
import { DrinkRepository } from 'src/core/domain/repositories/drink.repository';
import { FileUploadService } from 'src/infra/aws/bucket.repository';
import { GetAlcoholicsReturnType } from 'src/@types';

@Injectable()
export class PrismaDrinkRepository implements DrinkRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileBucket: FileUploadService,
  ) {}

  async createDrinkRecipe(data: Drink) {
    return await this.prisma.drink.create({
      data: data as Prisma.DrinkCreateInput,
    });
  }

  async uploadDrinkPhoto(drinkId: string, file: Express.Multer.File) {
    const fileUrl = await this.fileBucket.upload(file);
    await this.prisma.drink.update({
      where: { id: drinkId },
      data: { imageUrl: fileUrl },
    });
    return fileUrl;
  }

  async getByNameAndAlcoholic(
    isAlcoholic: boolean,
    name: string,
  ): Promise<GetAlcoholicsReturnType> {
    return this.prisma.drink.findMany({
      where: {
        AND: [
          { isAlcoholic: { equals: isAlcoholic } },
          { name: { contains: name, mode: 'insensitive' } },
        ],
      },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        ingredients: true,
        imageUrl: true,
      },
      take: 20,
    });
  }

  async getAlcoholicDrinks(isAlcoholic: boolean) {
    return this.prisma.drink.findMany({
      where: { isAlcoholic },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        ingredients: true,
        imageUrl: true,
      },
      take: 20,
    });
  }

  async getDrinksByName(name: string) {
    return this.prisma.drink.findMany({
      where: { name: { contains: name, mode: 'insensitive' } },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        ingredients: true,
        isAlcoholic: true,
        imageUrl: true,
      },
      take: 20,
    });
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
        imageUrl: true,
      },
      take: 20,
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
