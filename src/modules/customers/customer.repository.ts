import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "./entities/customer.entity";
import { CreateCustomerDto } from "./dto/create.dto";
import { UpdateCustomerDto } from "./dto/update.dto";

@Injectable()
export class CustomerRepository {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) {}

    create(createCustomerDto: CreateCustomerDto): Customer {
        return this.customerRepository.create(createCustomerDto);
    }

    save(customer: Customer): Promise<Customer> {
        return this.customerRepository.save(customer);
    }

    preload(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer | undefined> {
        return this.customerRepository.preload({ id, ...updateCustomerDto });
    }

    findOneById(id: number): Promise<Customer | null> {
        return this.customerRepository.findOneBy({ id });
    }
}
