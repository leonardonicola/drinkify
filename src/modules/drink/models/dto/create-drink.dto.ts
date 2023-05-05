import {
  Length,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
} from 'class-validator';

export class CreateDrinkDto {
  @Length(2, 50)
  name: string;

  @Length(10, 255)
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(16, { message: 'Limite de quantidade ingredientes excedido!' })
  ingredients: string[];

  @IsArray()
  @ArrayMinSize(1)
  instructions: string[];

  @IsBoolean()
  isAlcoholic: boolean;
}
