import { EnumPlanType } from '../../common/enums/enum-planType.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: EnumPlanType;

  @Column()
  limit: number;

  @Column('float')
  price: number;

  @OneToMany(() => Customer, customer => customer.subscriptionPlan)
  customer: Customer;

}
