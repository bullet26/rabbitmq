import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PostService } from './post.service';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

describe('PostService', () => {
  let service: PostService;
  let rabbitMQServiceMock = {
    sendMessage: jest.mock,
  };

  beforeEach(async () => {
    rabbitMQServiceMock = {
      sendMessage: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: RabbitMQService, useValue: rabbitMQServiceMock },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a post', async () => {
    const mockPost = {
      author: 'John Doe',
      content: 'This is a sample post content.',
      date: new Date(),
    };
    const result = await service.createPost(mockPost);

    expect(result).toHaveProperty('author');
    expect(result).toHaveProperty('content');
    expect(result).toHaveProperty('id');
    expect(result.author).toBe(mockPost.author);
    expect(result.content).toBe(mockPost.content);
    expect(result.id).toBeDefined();
    expect(result.id).not.toBeNull();
  });

  it('should throw BadRequestException if content or author is missing', async () => {
    const mockPost = {
      content: 'This is a sample post content',
      author: '',
      date: new Date(),
    };
    await expect(service.createPost(mockPost)).rejects.toThrow(
      BadRequestException,
    );
  });
});
