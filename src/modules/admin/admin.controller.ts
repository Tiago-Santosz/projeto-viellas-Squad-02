import { Controller, Get, NotFoundException, Param, Put, RequestMapping } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Admin } from "./entities/admin.entity";

@Controller('admins')
export class AdminController {
    
}