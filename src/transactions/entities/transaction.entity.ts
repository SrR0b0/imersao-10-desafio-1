import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @Column({ primary: true })
  id: string;

  @Column()
  type: 'debit' | 'credit';

  @Column()
  amount: number;
}
