import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateCommentDto } from '../../shared/dtos/comment/create-comment.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @IsPublic()
  @Get()
  getAllComments() {
    return this.commentService.getAllComments({ orderBy: { id: 'asc' } });
  }

  @Post()
  postComment(@Body() commentData: CreateCommentDto) {
    const { text, userId, drinkId } = commentData;
    return this.commentService.createComment({
      text,
      Drink: { connect: { id: drinkId } },
      User: { connect: { id: userId } },
    });
  }

  @Delete(':id')
  removeComment(@Param('id') id: string) {
    return this.commentService.removeComment({ id });
  }
}
