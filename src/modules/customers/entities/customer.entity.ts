import {
    Column,
    Entity,
    PrimaryColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Plan } from './plan.entity';
  import { Photo } from 'src/modules/photo/entities/photo.entity';
  import { Purchase } from 'src/modules/purchase/entities/purchase.entity';
  
  @Entity()
  export class Customer {
    @PrimaryColumn()
    document: string;
  
    @ManyToOne(() => Plan, { eager: true }) // eager = carrega junto automaticamente
    @JoinColumn()
    subscriptionPlan: Plan;
  
    @OneToMany(() => Purchase, purchase => purchase.customer)
    purchases: Purchase[];
  
    @OneToMany(() => Photo, photo => photo.postedBy)
    photosPosted: Photo[];
  
    @OneToMany(() => Photo, photo => photo.downloadedBy)
    photosDownloaded: Photo[];
  }
  