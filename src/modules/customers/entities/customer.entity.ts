import {
    Column,
    Entity,
    PrimaryColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
    ChildEntity,
    OneToOne,
  } from 'typeorm';
  import { Plan } from './plan.entity';
  import { Photo } from '../../photo/entities/photo.entity';
  import { Purchase } from '../../purchase/entities/purchase.entity';
import { User } from '../../users/entities/user.entity';
  
  @Entity()
  export class Customer extends User{
    @PrimaryColumn()
    document: string;
    
    @OneToOne(() => User, { eager: true, cascade: true })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Plan, { eager: true }) 
    @JoinColumn()
    subscriptionPlan: Plan;
  
    @OneToMany(() => Purchase, purchase => purchase.customer)
    purchases: Purchase[];
  
    @OneToMany(() => Photo, photo => photo.postedBy)
    photosPosted: Photo[];
  
    @OneToMany(() => Photo, photo => photo.downloadedBy)
    photosDownloaded: Photo[];
  }
 