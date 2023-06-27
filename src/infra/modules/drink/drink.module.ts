import { Module } from '@nestjs/common';
import { DrinkController } from 'src/presentations/drink.controller';
import { PrismaService } from 'src/infra/prisma/repositories/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { DrinkRepository } from 'src/core/domain/repositories/drink.repository';
import { PrismaDrinkRepository } from 'src/infra/prisma/repositories/drink.repository';
import { CreateDrinkUseCase } from 'src/usecases/drink/create-drink.usecase';
import { UpdateDrinkUseCase } from 'src/usecases/drink/update-drink.usecase';
import { GetAllDrinksUseCase } from 'src/usecases/drink/get-all.usecase';
import { GetDrinkByIdUseCase } from 'src/usecases/drink/get-by-id.usecase';
import { DeleteDrinkUseCase } from 'src/usecases/drink/delete-drink.usecase';
import { FileUploadService } from 'src/infra/aws/bucket.repository';
import { UploadDrinkPhotoUseCase } from 'src/usecases/drink/upload-photo.usecase';
import { GetDrinkByNameUseCase } from 'src/usecases/drink/get-drink-by-name.usecase';
import { GetAlcoholicDrinksUseCase } from 'src/usecases/drink/get-alcoholic-drinks.usecase';
import { GetByNameAndAlcoholicUseCase } from 'src/usecases/drink/get-by-name-and-alcoholic.usecase';

@Module({
  controllers: [DrinkController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: DrinkRepository,
      useClass: PrismaDrinkRepository,
    },
    GetDrinkByNameUseCase,
    GetAlcoholicDrinksUseCase,
    GetByNameAndAlcoholicUseCase,
    FileUploadService,
    UploadDrinkPhotoUseCase,
    CreateDrinkUseCase,
    UpdateDrinkUseCase,
    GetAllDrinksUseCase,
    GetDrinkByIdUseCase,
    DeleteDrinkUseCase,
  ],
})
export class DrinkModule {}
