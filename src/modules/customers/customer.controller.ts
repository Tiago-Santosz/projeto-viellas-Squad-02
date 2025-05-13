import {
    Controller,
    Post,
    Body,
    Param,
    ParseIntPipe,
    Put,
    Patch,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { CustomerService } from './customer.service';
  import { CreateCustomerDto } from './dto/create.dto';
  import { UpdateCustomerDto } from './dto/update.dto';
  import { Customer } from './entities/customer.entity';
  
  @Controller('customers')
  export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
      return this.customerService.create(createCustomerDto);
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCustomerDto: UpdateCustomerDto,
    ): Promise<Customer> {
      return this.customerService.update(id, updateCustomerDto);
    }
  
    @Patch(':id')
    async patch(
      @Param('id', ParseIntPipe) id: number,
      @Body() partialUpdate: Partial<UpdateCustomerDto>,
    ): Promise<Customer> {
      return this.customerService.patch(id, partialUpdate);
    }
  }
  