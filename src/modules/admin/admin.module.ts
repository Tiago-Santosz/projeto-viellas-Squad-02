import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AdminRepository } from "./admin.repository";

@Module({
    imports: [],
    controllers: [AdminController],
    providers: [AdminService, AdminRepository],
    exports: [],
})
export class AdminModule {}