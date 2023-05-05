import { IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @Length(8, 255, { message: 'Seu comentário é muito curto!' })
  text: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  drinkId: string;
}
