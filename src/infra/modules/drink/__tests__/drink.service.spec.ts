import { Test, TestingModule } from '@nestjs/testing';
import { DrinkService } from '../drink.service';
import { PrismaService } from '../../../infra/prisma/repositories/prisma.service';

describe('DrinkService', () => {
  let service: DrinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrinkService, PrismaService],
    }).compile();

    service = module.get<DrinkService>(DrinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
