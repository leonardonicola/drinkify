import { Test, TestingModule } from '@nestjs/testing';
import { DrinkController } from '../drink.controller';
import { DrinkService } from '../drink.service';
import { PrismaService } from '../../../infra/prisma/repositories/prisma.service';

describe('DrinkController', () => {
  let controller: DrinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrinkController],
      providers: [DrinkService, PrismaService],
    }).compile();

    controller = module.get<DrinkController>(DrinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
