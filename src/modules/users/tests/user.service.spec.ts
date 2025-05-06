import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword',
    isDeleted: false,
    isVerified: false
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.create.mockImplementation(async (user: User) => ({
        ...user,
        id: 1,
      }));

      const dto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test1234',
      };

      const result = await service.createUser(dto);

      expect(result).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      });
      expect(userRepository.create).toHaveBeenCalled();
    });

    it('should throw on invalid email', async () => {
      const dto = {
        name: 'Test User',
        email: 'invalid-email',
        password: 'Test1234',
      };

      await expect(service.createUser(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw if email already exists', async () => {
      userRepository.findByEmail.mockResolvedValue(mockUser);

      const dto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test1234',
      };

      await expect(service.createUser(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw on invalid password', async () => {
      userRepository.findByEmail.mockResolvedValue(null);

      const dto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'short',
      };

      await expect(service.createUser(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findUserByEmail', () => {
    it('should return user if exists', async () => {
      userRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.findUserByEmail('test@example.com');
      expect(result).toEqual(mockUser);
    });

    it('should throw if user not found', async () => {
      userRepository.findByEmail.mockResolvedValue(null);

      await expect(service.findUserByEmail('notfound@example.com')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findUserById', () => {
    it('should return user if exists', async () => {
      userRepository.findById.mockResolvedValue(mockUser);

      const result = await service.findUserById(1);
      expect(result).toEqual(mockUser);
    });

    it('should throw if user not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(service.findUserById(999)).rejects.toThrow(BadRequestException);
    });
  });

  describe('validateUserCredentials', () => {
    it('should return user if credentials are valid', async () => {
      const password = 'Test1234';
      const hashed = await bcrypt.hash(password, 10);

      userRepository.findByEmail.mockResolvedValue({
        ...mockUser,
        password: hashed,
      });

      const result = await service.validateUserCredentials(mockUser.email, password);
      expect(result).toEqual(expect.objectContaining({ id: mockUser.id }));
    });

    it('should throw if password does not match', async () => {
      userRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(
        service.validateUserCredentials(mockUser.email, 'WrongPass123')
      ).rejects.toThrow(BadRequestException);
    });
  });


  describe('deleteUser', () => {
    it('should call repository delete', async () => {
      userRepository.delete.mockResolvedValue(undefined);

      await expect(service.deleteUser(1)).resolves.toBeUndefined();
    });
  });
});
