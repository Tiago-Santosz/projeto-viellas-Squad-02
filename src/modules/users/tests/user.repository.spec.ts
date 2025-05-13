import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockRepo: jest.Mocked<Repository<User>>;

  const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
      isDeleted: false,
      isVerified: false,
      name: 'rogério'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    mockRepo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should save a user', async () => {
      mockRepo.save.mockResolvedValue(mockUser);
      const result = await userRepository.create(mockUser);
      expect(result).toEqual(mockUser);
      expect(mockRepo.save).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return users not marked as deleted', async () => {
      mockRepo.find.mockResolvedValue([mockUser]);
      const result = await userRepository.findAll();
      expect(result).toEqual([mockUser]);
      expect(mockRepo.find).toHaveBeenCalledWith({ where: { isDeleted: false } });
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      mockRepo.findOne.mockResolvedValue(mockUser);
      const result = await userRepository.findByEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      mockRepo.findOne.mockResolvedValue(mockUser);
      const result = await userRepository.findById(1);
      expect(result).toEqual(mockUser);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('update', () => {
    it('should save the updated user', async () => {
      mockRepo.save.mockResolvedValue(mockUser);
      const result = await userRepository.update(mockUser);
      expect(result).toEqual(mockUser);
      expect(mockRepo.save).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('delete', () => {
    it('should delete the user by id', async () => {
      mockRepo.delete.mockResolvedValue({ affected: 1 } as any);
      await userRepository.delete(1);
      expect(mockRepo.delete).toHaveBeenCalledWith(1);
    });
  });
});
