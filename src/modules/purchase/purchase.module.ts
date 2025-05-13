import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Purchase } from "./entities/purchase.entity";
import { PurchaseRepository } from "./purchase.repository";
import { PurchaseService } from "./purchase.service";

@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  providers: [PurchaseService, PurchaseRepository],
  exports: [PurchaseService], 
})
export class PurchaseModule {}
