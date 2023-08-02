import { Test, TestingModule } from '@nestjs/testing';
import { PrismaCommentRepository } from '../../infra/repositories/comment.repository';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { Comment } from '../../core/domain/entities/comment.entity';

export const mockComments: Comment[] = [
  {
    id: 'frggreg-erw',
    text: 'Comentario primeiro',
  },
  {
    id: 'nmbm-1239masdmasd',
    text: 'Comentario segundo',
  },
  {
    id: 'asd3123123-fsdfasdf-qwejyj',
    text: 'Comentário 3',
  },
];

describe('CommentService', () => {
  let commentRepo: PrismaCommentRepository;
  let prisma: PrismaService;

  const prismaMock = {
    comment: {
      create: jest.fn().mockReturnValue(mockComments[0]),
      findMany: jest.fn().mockResolvedValue(mockComments),
      delete: jest.fn().mockResolvedValue(mockComments[0]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaCommentRepository,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    commentRepo = module.get<PrismaCommentRepository>(PrismaCommentRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of comments`, async () => {
      const response = await commentRepo.getAllComments();

      expect(response).toEqual(mockComments);
      expect(prisma.comment.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
