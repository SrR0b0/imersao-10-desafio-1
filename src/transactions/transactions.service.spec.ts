import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      insert: jest.fn(() => Promise.resolve()),
      find: jest.fn(() => Promise.resolve([])),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call the repository insert method', async () => {
      await service.create({ id: '1', type: 'debit', amount: 42 });
      expect(repositoryMock.insert).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should call the repository find method and return and array', async () => {
      const transactions = await service.findAll();
      expect(repositoryMock.find).toHaveBeenCalled();
      expect(transactions).toBeInstanceOf(Array);
    });
  });
});
