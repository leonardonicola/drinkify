import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from '../comment.service';
import { PrismaService } from '../../../infra/prisma/repositories/prisma.service';
import { mockComments } from './comment.mock';

describe('CommentService', () => {
  let service: CommentService;
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
        CommentService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of comments`, async () => {
      const response = await service.getAllComments({});

      expect(response).toEqual(mockComments);
      expect(prisma.comment.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
