// photo.module.ts
import { forwardRef, Module } from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { Photo } from "./entities/photo.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "../admin/admin.module";
import { PhotoRepository } from "./photo.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo])
  ],
  providers: [PhotoService, PhotoRepository],
  exports: [PhotoService],
})
export class PhotoModule {}
