import { Injectable } from '@nestjs/common';
import { DrinkRepository } from '../../core/domain/repositories/drink.repository';

@Injectable()
export class UploadDrinkPhotoUseCase {
  constructor(private readonly drinkRepo: DrinkRepository) {}

  async execute(drinkId: string, file: Express.Multer.File): Promise<string> {
    return await this.drinkRepo.uploadDrinkPhoto(drinkId, file);
  }
}
