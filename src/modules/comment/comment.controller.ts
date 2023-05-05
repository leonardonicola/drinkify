import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment as CommentModel } from '@prisma/client';
import { CreateCommentDto } from './models/dto/create-comment.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @IsPublic()
  @Get()
  getAllComments(): Promise<CommentModel[] | null> {
    return this.commentService.getAllComments({ orderBy: { id: 'asc' } });
  }

  @Post()
  postComment(@Body() commentData: CreateCommentDto): Promise<CommentModel> {
    const { text, userId, drinkId } = commentData;
    return this.commentService.createComment({
      text,
      Drink: { connect: { id: drinkId } },
      User: { connect: { id: userId } },
    });
  }

  @Delete(':id')
  removeComment(@Param('id') id: string): Promise<CommentModel> {
    return this.commentService.removeComment({ id });
  }
}
