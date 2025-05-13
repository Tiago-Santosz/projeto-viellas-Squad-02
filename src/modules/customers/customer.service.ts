import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepository } from "./customer.repository";
import { CreateCustomerDto } from "./dto/create.dto";
import { UpdateCustomerDto } from "./dto/update.dto";
import { Customer } from "./entities/customer.entity";

@Injectable()
export class CustomerService {
    constructor(private readonly customerRepository: CustomerRepository) {}

    validateDocument(document: string): boolean {
        const cpfRegex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
        const cnpjRegex = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/;
        return cpfRegex.test(document) || cnpjRegex.test(document);
    }
    
    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        if(!this.validateDocument(createCustomerDto.document)){
            throw new BadRequestException('The CPF/CNPJ is not valid');
        }
        const customer = this.customerRepository.create(createCustomerDto);
        return this.customerRepository.save(customer);
    }

    async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        const customer = await this.customerRepository.preload(id, updateCustomerDto);

        if (!customer) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }

        return this.customerRepository.save(customer);
    }

    async patch(id: number, partialUpdate: Partial<UpdateCustomerDto>): Promise<Customer> {
        const customer = await this.customerRepository.findOneById(id);

        if (!customer) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }

        const updated = Object.assign(customer, partialUpdate);
        return this.customerRepository.save(updated);
    }
}
