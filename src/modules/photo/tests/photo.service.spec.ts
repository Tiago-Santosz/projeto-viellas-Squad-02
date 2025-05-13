import { Test, TestingModule } from '@nestjs/testing';
import { PhotoService } from '../photo.service';
import { PhotoRepository } from '../photo.repository';
import { Photo } from '../entities/photo.entity';
import { CreatePhotoDto } from '../dto/create.dto';
import { UpdatePhotoDto } from '../dto/update.dto';
import { EnumCategory } from '../../common/enums/enum-category.enum';
import { Customer } from '../../customers/entities/customer.entity';

describe('PhotoService', () => {
  let service: PhotoService;
  let repository: jest.Mocked<PhotoRepository>;

  const mockPhoto: Photo = {
      id: 1, url: 'http://example.com/photo.jpg', description: 'Example',
      title: '',
      owner: '',
      data: {},
      category: EnumCategory.Exposicao,
      date: new Date,
      postedBy: new Customer('John Doe', 'john.doe@example.com', 'password123'),
      downloadedBy: new Customer('Jane Doe', 'jane.doe@example.com', 'password456')
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotoService,
        {
          provide: PhotoRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PhotoService>(PhotoService);
    repository = module.get(PhotoRepository);
  });

  it('should create a photo', async () => {
    const dto: CreatePhotoDto = {
        url: 'http://example.com/photo.jpg', description: 'Example',
        title: '',
        category: EnumCategory.Exposicao
    };
    repository.create.mockResolvedValue(mockPhoto);

    const result = await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith(expect.objectContaining(dto));
    expect(result).toEqual(mockPhoto);
  });

  it('should return all photos', async () => {
    repository.findAll.mockResolvedValue([mockPhoto]);

    const result = await service.findAll();

    expect(repository.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockPhoto]);
  });

  it('should return one photo by id', async () => {
    repository.findById.mockResolvedValue(mockPhoto);

    const result = await service.findById(1);

    expect(repository.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockPhoto);
  });

  it('should throw an error when photo not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.findById(999)).rejects.toThrowError('Photo with id 999 not found');
  });

  it('should update a photo', async () => {
    const updateDto: UpdatePhotoDto = { description: 'Updated description' };
    repository.update.mockResolvedValue({ ...mockPhoto, ...updateDto });

    const result = await service.update(1, updateDto);

    expect(repository.update).toHaveBeenCalledWith(1, updateDto);
    expect(result.description).toEqual('Updated description');
  });

  it('should delete a photo', async () => {
    repository.delete.mockResolvedValue();

    await service.delete(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
