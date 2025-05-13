import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../customer.controller';
import { CustomerService } from '../customer.service';
import { CreateCustomerDto } from '../dto/create.dto';
import { UpdateCustomerDto } from '../dto/update.dto';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: jest.Mocked<CustomerService>;

  const mockCustomer = { id: 1, document: '12345678900' } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            patch: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get(CustomerService);
  });

  it('should call service.create on POST /customers', async () => {
    const dto: CreateCustomerDto = { document: '12345678900', subscriptionPlanId: 1 };
    service.create.mockResolvedValue(mockCustomer);

    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockCustomer);
  });

  it('should call service.update on PUT /customers/:id', async () => {
    const dto: UpdateCustomerDto = {};
    service.update.mockResolvedValue(mockCustomer);

    const result = await controller.update(1, dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(mockCustomer);
  });

  
});
