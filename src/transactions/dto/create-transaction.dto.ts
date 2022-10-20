import { IsIn, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  id!: string;

  @IsIn(['credit', 'debit'])
  type!: 'credit' | 'debit';

  @IsPositive()
  amount!: number;
}
