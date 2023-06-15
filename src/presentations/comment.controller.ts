import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateCommentDto } from '../shared/dtos/comment/create-comment.dto';
import { IsPublic } from '../infra/modules/auth/decorators/is-public.decorator';
import { CreateCommentUseCase } from '../usecases/comment/create-comment.usecase';
import { RemoveCommentUseCase } from '../usecases/comment/remove-comment.usecase';
import { GetCommentsUseCase } from '../usecases/comment/get-comments.usecase';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly removeCommentUseCase: RemoveCommentUseCase,
    private readonly getCommentsUseCase: GetCommentsUseCase,
  ) {}

  @IsPublic()
  @Get()
  getAllComments() {
    return this.getCommentsUseCase.execute();
  }

  @Post()
  postComment(@Body() commentData: CreateCommentDto) {
    return this.createCommentUseCase.execute(commentData);
  }

  @Delete(':id')
  removeComment(@Param('id') id: string) {
    return this.removeCommentUseCase.execute(id);
  }
}
