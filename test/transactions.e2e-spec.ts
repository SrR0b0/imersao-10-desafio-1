import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dropDatabase } from 'typeorm-extension';
import { Transaction } from '../src/transactions/entities/transaction.entity';
import { TransactionsController } from '../src/transactions/transactions.controller';
import { TransactionsService } from '../src/transactions/transactions.service';

describe('TransactionsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test.sqlite',
          entities: [Transaction],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Transaction]),
      ],
      controllers: [TransactionsController],
      providers: [TransactionsService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    dropDatabase({
      options: {
        type: 'sqlite',
        database: 'test.sqlite',
      },
    });
  });

  it('/transactions (POST)', () => {
    return request(app.getHttpServer())
      .post('/transactions')
      .send({
        id: '1',
        type: 'debit',
        amount: 42,
      })
      .expect(201);
  });

  it('/transactions (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(1);
        expect(body[0]).toMatchObject({
          id: '1',
          type: 'debit',
          amount: 42,
        });
      });
  });
});
