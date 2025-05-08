import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
  import { EnumCategory } from 'src/modules/common/enums/enum-category.enum';
  import { Customer } from 'src/modules/customers/entities/customer.entity';
  
  @Entity()
  export class Photo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    url: string;
  
    @Column()
    title: string;
  
    @Column()
    owner: string;
  
    @Column()
    description: string;
  
    @Column('simple-json', { nullable: true }) 
    data: Record<string, string>;
  
    @Column()
    category: EnumCategory;
  
    @Column()
    date: Date;
  
    @ManyToOne(() => Customer, customer => customer.photosPosted)
    postedBy: Customer;
  
    @ManyToOne(() => Customer, customer => customer.photosDownloaded)
    downloadedBy: Customer;
  }
  