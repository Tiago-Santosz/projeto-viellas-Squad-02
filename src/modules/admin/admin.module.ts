// admin.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AdminRepository } from "./admin.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity"; 
import { PhotoModule } from "../photo/photo.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    forwardRef(() => PhotoModule), 
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
