import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from '../../presentations/comment.controller';
import { CreateCommentUseCase } from '../../usecases/comment/create-comment.usecase';
import { GetCommentsUseCase } from '../../usecases/comment/get-comments.usecase';
import { RemoveCommentUseCase } from '../../usecases/comment/remove-comment.usecase';
import { CommentRepository } from '../../core/domain/repositories/comment.repository';
import { InMemoryCommentRepository } from '../../infra/in-memory/comment-memory.repository';

describe('CommentController', () => {
  let controller: CommentController;

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('CREATE', () => {
    it('SUCESS: should create a new comment', async () => {
      // Arrange
      const commentData = {
        text: 'Fetuuuuce',
        drinkId: 'asidiqwd',
        userId: 'KASD01023=1230asd9',
      };

      // Act
      const result = await controller.postComment(commentData);

      // Assert
      expect(result).toEqual({ id: '1', ...commentData });
    });
  });

  describe('GET', () => {
    it('SUCESS: should return an array of comments', async () => {
      const commentData = {
        text: 'Fetuuuuce',
        drinkId: 'asidiqwd',
        userId: 'KASD01023=1230asd9',
      };

      await controller.postComment(commentData);

      const result = await controller.getAllComments();

      expect(result).toEqual([{ ...commentData, id: '1' }]);
    });

    it('SUCESS: should return an empty array if no comments are found', async () => {
      // Act
      const result = await controller.getAllComments();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('REMOVE', () => {
    it('SUCESS: should remove a comment', async () => {
      const comment = {
        text: 'Removed comment text ',
        drinkId: 'asidiqwd',
        userId: 'KASD01023=1230asd9',
      };

      await controller.postComment(comment);

      // Act
      const result = await controller.removeComment('1');

      // Assert
      expect(result).toEqual({ id: '1', ...comment });
    });

    it('ERROR: should not remove comment - Inexistent comment', () => {
      // Act
      const result = controller.removeComment('1');

      // Assert
      expect(result).rejects.toThrowError('Comment not found');
    });

    it('ERROR: should not remove comment - Missing ID', async () => {
      // Arrange
      const commentId = undefined;

      // Act
      const result = controller.removeComment(commentId);

      // Assert
      await expect(result).rejects.toThrowError('Id must be provided');
    });
  });
});
