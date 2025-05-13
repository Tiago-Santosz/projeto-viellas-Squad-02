import { EnumPosition } from "../../common/enums/enum-position.enum";
import { User } from "../../users/entities/user.entity";
import { ChildEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin extends User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  position: EnumPosition;

  @Column("simple-array")
  permissions: string[];
  
  constructor(name: string, email: string, password: string) {
    super(
     name,
     email,
     password,)
}
}
