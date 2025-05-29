import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  const messageModel = {
    find: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    limit: jest.fn(),
    constructorMock: jest.fn().mockImplementation(() => ({
      save: jest.fn(),
    })),
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: getModelToken('Message'), useValue: messageModel },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a message by id', async () => {
    const messageId = '12345';
    const mockMessage = {
      _id: messageId,
      content: 'Hello World',
      author: 'Author1',
      date: new Date(),
    };
    messageModel.findById.mockResolvedValue(mockMessage);

    const result = await service.findByID(messageId);
    expect(result).toEqual(mockMessage);
    expect(messageModel.findById).toHaveBeenCalledWith(messageId);
  });

  it('should return all messages', async () => {
    const mockMessages = [
      { _id: '1', content: 'Message 1', author: 'Author1' },
      { _id: '2', content: 'Message 2', author: 'Author2' },
    ];
    const limitMock = messageModel.limit.mockResolvedValue(mockMessages);
    messageModel.find.mockReturnValue({ limit: limitMock });

    const result = await service.findAll({});
    expect(result).toEqual(mockMessages);
    expect(messageModel.find).toHaveBeenCalledWith({});
  });

  it('should return messages filtered by author', async () => {
    const mockMessages = [
      { _id: '1', content: 'Message 1', author: 'Author1' },
      { _id: '2', content: 'Message 2', author: 'Author1' },
    ];

    const limitMock = messageModel.limit.mockResolvedValue(mockMessages);
    messageModel.find.mockReturnValue({ limit: limitMock });

    const result = await service.findAll({ author: 'Author1' });
    expect(result).toEqual(mockMessages);
    expect(messageModel.find).toHaveBeenCalledWith({ author: 'Author1' });
    expect(messageModel.limit).toHaveBeenCalledWith(100);
  });

  it('should return messages filtered by date range', async () => {
    const startDate = new Date('2022-04-01').toISOString();
    const endDate = new Date('2023-12-31').toISOString();

    const mockMessages = [
      { _id: '1', content: 'Message 1', author: 'Author1', date: startDate },
      { _id: '4', content: 'Message 4', author: 'Author2', date: endDate },
    ];

    const limitMock = messageModel.limit.mockResolvedValue(mockMessages);
    messageModel.find.mockReturnValue({ limit: limitMock });

    const result = await service.findAll({ startDate, endDate });
    expect(result).toEqual(mockMessages);
    expect(messageModel.find).toHaveBeenCalledWith({
      date: { $gte: startDate, $lt: endDate },
    });
  });

  it('should create a message', async () => {
    // !fix     TypeError: this.messageModel is not a constructor
    const createMessageDto = {
      content: 'Hello World',
      author: 'Author1',
      date: new Date(),
    };
    const savedMessage = { ...createMessageDto, _id: '12345' };

    messageModel.constructorMock(savedMessage);

    const result = await service.create(createMessageDto);
    expect(result).toEqual(savedMessage);
    expect(messageModel.constructorMock).toHaveBeenCalledWith(createMessageDto);
    expect(messageModel.save).toHaveBeenCalled();
  });

  it('should throw BadRequestException if content is missing', async () => {
    const createMessageDto = {
      author: 'Author1',
      date: new Date(),
      content: '',
    };
    await expect(service.create(createMessageDto)).rejects.toThrow(
      BadRequestException,
    );
    expect(messageModel.save).not.toHaveBeenCalled();
  });
});
