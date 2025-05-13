import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
  import { EnumPlanType } from '../../common/enums/enum-planType.enum';
  import { Customer } from '../../customers/entities/customer.entity';
  import { EnumPaymentMethod } from '../../common/enums/enum-paymentMethod.enum';
  
  @Entity()
  export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    type: EnumPlanType;
  
    @Column('float')
    price: number;
  
    @Column()
    paymentMethod: EnumPaymentMethod;
  
    @Column()
    date: Date;
  
    @ManyToOne(() => Customer, customer => customer.purchases)
    customer: Customer;
  }
  