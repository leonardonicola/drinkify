import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CreateDrinkDto } from '../shared/dtos/drink/create-drink.dto';
import { UpdateDrinkDto } from '../shared/dtos/drink/update-drink.dto';
import { IsPublic } from '../infra/modules/auth/decorators/is-public.decorator';
import { CreateDrinkUseCase } from '../usecases/drink/create-drink.usecase';
import { UpdateDrinkUseCase } from '../usecases/drink/update-drink.usecase';
import { GetDrinkByIdUseCase } from '../usecases/drink/get-by-id.usecase';
import { GetAllDrinksUseCase } from '../usecases/drink/get-all.usecase';
import { DeleteDrinkUseCase } from '../usecases/drink/delete-drink.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDrinkPhotoUseCase } from '../usecases/drink/upload-photo.usecase';

@Controller('drink')
export class DrinkController {
  constructor(
    private readonly createDrinkUseCase: CreateDrinkUseCase,
    private readonly updateDrinkUseCase: UpdateDrinkUseCase,
    private readonly getDrinkByIdUseCase: GetDrinkByIdUseCase,
    private readonly getAllDrinksUseCase: GetAllDrinksUseCase,
    private readonly deleteDrinkUseCase: DeleteDrinkUseCase,
    private readonly uploadDrinkPhotoUseCase: UploadDrinkPhotoUseCase,
  ) {}

  @Post()
  createDrinkRecipe(@Body() data: CreateDrinkDto) {
    return this.createDrinkUseCase.execute(data);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          req.fileValidationError = true;
          callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  @Put(':id/image')
  uploadDrinkPhoto(
    @Param('id') drinkId: string,
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req: any,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException('Unsupported file type');
    }
    return this.uploadDrinkPhotoUseCase.execute(drinkId, file);
  }

  @IsPublic()
  @Get()
  getAllDrinks() {
    return this.getAllDrinksUseCase.execute();
  }

  @IsPublic()
  @Get(':id')
  getDrinkById(@Param('id') id: string) {
    return this.getDrinkByIdUseCase.execute(id);
  }

  @Put(':id')
  updateDrinkRecipe(
    @Param('id') id: string,
    @Body() updateDrinkDto: UpdateDrinkDto,
  ) {
    return this.updateDrinkUseCase.execute(id, updateDrinkDto);
  }

  @Delete(':id')
  deleteDrink(@Param('id') id: string) {
    return this.deleteDrinkUseCase.execute(id);
  }
}
