import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from '../../presentations/comment.controller';
import { CreateCommentUseCase } from '../../usecases/comment/create-comment.usecase';
import { GetCommentsUseCase } from '../../usecases/comment/get-comments.usecase';
import { RemoveCommentUseCase } from '../../usecases/comment/remove-comment.usecase';
import { CommentRepository } from '../../core/domain/repositories/comment.repository';
import { InMemoryCommentRepository } from '../../infra/in-memory/comment-memory.repository';

describe('CommentController', () => {
  let controller: CommentController;
  let createCommentUseCase: CreateCommentUseCase;
  let getCommentsUseCase: GetCommentsUseCase;
  let removeCommentUseCase: RemoveCommentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CreateCommentUseCase,
        {
          provide: CommentRepository,
          useClass: InMemoryCommentRepository,
        },
        GetCommentsUseCase,
        RemoveCommentUseCase,
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
    createCommentUseCase =
      module.get<CreateCommentUseCase>(CreateCommentUseCase);
    getCommentsUseCase = module.get<GetCommentsUseCase>(GetCommentsUseCase);
    removeCommentUseCase =
      module.get<RemoveCommentUseCase>(RemoveCommentUseCase);
  });

  describe('createComment', () => {
    it('should create a new comment', async () => {
      // Arrange
      const commentData = {
        text: 'Fetuuuuce',
        drinkId: 'asidiqwd',
        userId: 'KASD01023=1230asd9',
      };

      const createCommentSpy = jest
        .spyOn(createCommentUseCase, 'execute')
        .mockResolvedValueOnce({
          id: 'kasdkasdo=1230asd',
          text: 'Fetuuuuce',
        });

      // Act
      const result = await controller.postComment(commentData);

      // Assert
      expect(result).toEqual({ id: 'kasdkasdo=1230asd', text: 'Fetuuuuce' });
      expect(createCommentSpy).toHaveBeenCalledWith(commentData);
    });
  });

  describe('getComments', () => {
    it('should return an array of comments', async () => {
      // Arrange
      const comments = [
        { id: 'asd-123asd', text: 'Comment 1' },
        { id: 'asdjq-124919asd', text: 'Comment 2' },
      ];

      const getCommentsSpy = jest
        .spyOn(getCommentsUseCase, 'execute')
        .mockResolvedValueOnce(comments);

      // Act
      const result = await controller.getAllComments();

      // Assert
      expect(result).toEqual(comments);
      expect(getCommentsSpy).toHaveBeenCalled();
    });
  });

  describe('removeComment', () => {
    it('should remove a comment', async () => {
      // Arrange
      const commentId = 'asjdajs-123asdasd';

      const removeCommentSpy = jest
        .spyOn(removeCommentUseCase, 'execute')
        .mockResolvedValueOnce({
          id: commentId,
          text: 'Removed comment text ',
        });

      // Act
      const result = await controller.removeComment(commentId);

      // Assert
      expect(result).toEqual({
        id: commentId,
        text: 'Removed comment text ',
      });
      expect(removeCommentSpy).toHaveBeenCalledWith(commentId);
    });
  });
});
