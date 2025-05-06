import { EnumPlanType } from 'src/modules/common/enums/enum-planType.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
