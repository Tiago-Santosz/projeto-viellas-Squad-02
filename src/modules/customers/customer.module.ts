import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity";
import { Plan } from "./entities/plan.entity";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "./customer.repository";
import { CustomerController } from "./customer.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Plan])],
    controllers: [CustomerController],
    providers: [CustomerService, CustomerRepository],
    
})
export class CustomerModule {}