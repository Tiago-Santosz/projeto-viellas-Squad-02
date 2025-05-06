import { EnumPosition } from "src/modules/common/enums/enum-position.enum";
import { User } from "src/modules/users/entities/user.entity";
import { ChildEntity, Column, Entity } from "typeorm";

@Entity()
@ChildEntity()
export class Admin extends User {
  @Column()
  position: EnumPosition;

  @Column("simple-array")
  permissions: string[];
}
