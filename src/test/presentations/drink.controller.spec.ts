import { Test, TestingModule } from '@nestjs/testing';
import { DrinkRepository } from '../../core/domain/repositories/drink.repository';
import { InMemoryDrinkRepository } from '../../infra/in-memory/drink-memory.repository';
import { DrinkController } from '../../presentations/drink.controller';
import { CreateDrinkUseCase } from '../../usecases/drink/create-drink.usecase';
import { DeleteDrinkUseCase } from '../../usecases/drink/delete-drink.usecase';
import { GetAllDrinksUseCase } from '../../usecases/drink/get-all.usecase';
import { GetDrinkByIdUseCase } from '../../usecases/drink/get-by-id.usecase';
import { UpdateDrinkUseCase } from '../../usecases/drink/update-drink.usecase';
import { UploadDrinkPhotoUseCase } from '../../usecases/drink/upload-photo.usecase';

describe('DrinkController', () => {
  let controller: DrinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrinkController],
      providers: [
        CreateDrinkUseCase,
        {
          provide: DrinkRepository,
          useClass: InMemoryDrinkRepository,
        },
        DeleteDrinkUseCase,
        UpdateDrinkUseCase,
        UploadDrinkPhotoUseCase,
        GetDrinkByIdUseCase,
        GetAllDrinksUseCase,
      ],
    }).compile();

    controller = module.get<DrinkController>(DrinkController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('SUCESS: should return an array of drinks', async () => {
      const result = await controller.getAllDrinks();

      expect(result).toEqual([]);
    });
  });

  describe('CREATE', () => {
    it('SUCESS: should create a new drink', async () => {
      const drink = {
        name: 'Created Drink',
        description: "It's a drink",
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: ['instruction1', 'instruction2'],
        isAlcoholic: false,
      };
      const result = await controller.createDrinkRecipe(drink);

      expect(result).toEqual({ ...drink, id: '1' });
    });

    it('ERROR: should not create a new drink - Missing name', async () => {
      const drink = {
        name: undefined,
        description: "It's a drink",
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: ['instruction1', 'instruction2'],
        isAlcoholic: false,
      };

      await expect(controller.createDrinkRecipe(drink)).rejects.toThrow(
        'Drink must have a name',
      );
    });

    it('ERROR: should not create a new drink - Missing description', async () => {
      const drink = {
        name: 'Created Drink',
        description: undefined,
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: ['instruction1', 'instruction2'],
        isAlcoholic: false,
      };

      await expect(controller.createDrinkRecipe(drink)).rejects.toThrow(
        'Drink must have a description',
      );
    });

    it('ERROR: should not create a new drink - Missing ingredients', async () => {
      const drink = {
        name: 'Created Drink',
        description: "It's a drink",
        ingredients: undefined,
        instructions: ['instruction1', 'instruction2'],
        isAlcoholic: false,
      };

      await expect(controller.createDrinkRecipe(drink)).rejects.toThrow(
        'Drink must have ingredients',
      );
    });

    it('ERROR: should not create a new drink - Missing instructions', async () => {
      const drink = {
        name: 'Created Drink',
        description: "It's a drink",
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: undefined,
        isAlcoholic: false,
      };

      await expect(controller.createDrinkRecipe(drink)).rejects.toThrow(
        'Drink must have instructions',
      );
    });

    it('ERROR: should not create a new drink - Missing isAlcoholic', async () => {
      const drink = {
        name: 'Created Drink',
        description: "It's a drink",
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: ['instruction1', 'instruction2'],
        isAlcoholic: undefined,
      };

      await expect(controller.createDrinkRecipe(drink)).rejects.toThrow(
        'Must specify if drink is alcoholic or not',
      );
    });
  });
  describe('DELETE', () => {
    it('SUCESS: should delete a drink', async () => {
      const drink = {
        name: 'Created Drink',
        description: "It's a drink",
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: ['instruction1', 'instruction2'],
        isAlcoholic: false,
      };
      await controller.createDrinkRecipe(drink);
      const result = await controller.deleteDrink('1');

      expect(result).toEqual({ ...drink, id: '1' });
    });

    it('ERROR: should not delete a drink - Drink not found', async () => {
      await expect(controller.deleteDrink('2')).rejects.toThrow(
        'Drink not found',
      );
    });

    it('ERROR: should not delete a drink - Missing id', async () => {
      await expect(controller.deleteDrink(undefined)).rejects.toThrow(
        'Must provide id',
      );
    });
  });

  describe('UPDATE', () => {
    it('SUCESS: should update a drink', async () => {
      const drink = {
        name: 'Created Drink',
        description: "It's a drink",
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: ['instruction1', 'instruction2'],
        isAlcoholic: false,
      };
      await controller.createDrinkRecipe(drink);
      const result = await controller.updateDrinkRecipe('1', {
        name: 'Updated Drink',
        description: "It's a drink",
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: ['instruction1', 'instruction2'],
        isAlcoholic: false,
      });

      expect(result).toEqual({
        ...drink,
        id: '1',
        name: 'Updated Drink',
      });
    });

    it('ERROR: should not update a drink - Drink not found', async () => {
      await expect(
        controller.updateDrinkRecipe('2', {
          name: 'Updated Drink',
          description: "It's a drink",
          ingredients: ['ingredient1', 'ingredient2'],
          instructions: ['instruction1', 'instruction2'],
          isAlcoholic: false,
        }),
      ).rejects.toThrow('Drink not found');
    });
  });
});
