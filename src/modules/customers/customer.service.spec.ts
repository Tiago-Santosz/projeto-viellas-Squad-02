import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create.dto';
import { UpdateCustomerDto } from './dto/update.dto';

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: jest.Mocked<CustomerRepository>;

  const mockCustomer = { id: 1, document: '12345678900' } as any;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      save: jest.fn(),
      preload: jest.fn(),
      findOneById: jest.fn(),
    } as any;

    service = new CustomerService(repository);
  });

  describe('create', () => {
    it('should throw BadRequestException if document is invalid', async () => {
      const dto: CreateCustomerDto = { document: 'invalid', subscriptionPlanId: 1 };
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should create and return a customer', async () => {
      const dto: CreateCustomerDto = { document: '12345678900', subscriptionPlanId: 1 };
      repository.create.mockReturnValue(mockCustomer);
      repository.save.mockResolvedValue(mockCustomer);

      const result = await service.create(dto);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if customer not found', async () => {
      repository.preload.mockResolvedValue(undefined);
      await expect(service.update(1, {} as UpdateCustomerDto)).rejects.toThrow(NotFoundException);
    });

    it('should update and return customer', async () => {
      repository.preload.mockResolvedValue(mockCustomer);
      repository.save.mockResolvedValue(mockCustomer);

      const result = await service.update(1, {} as UpdateCustomerDto);
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('patch', () => {
    it('should throw NotFoundException if customer not found', async () => {
      repository.findOneById.mockResolvedValue(null);
      await expect(service.patch(1, {})).rejects.toThrow(NotFoundException);
    });

    
  });
});
