import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  const mockUser: any = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password'
  };

  const userDto = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
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
            findById: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository);
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      repository.findByEmail.mockResolvedValue(null);
      repository.create.mockResolvedValue({ ...mockUser });

      const result = await service.createUser(userDto);
      expect(result).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
    });

    it('should throw if email is invalid', async () => {
      await expect(
        service.createUser({ ...userDto, email: 'invalid-email' })
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw if email already exists', async () => {
      repository.findByEmail.mockResolvedValue(mockUser);
      await expect(service.createUser(userDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw if password is invalid', async () => {
      repository.findByEmail.mockResolvedValue(null);
      await expect(
        service.createUser({ ...userDto, password: 'short' })
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      repository.update.mockResolvedValue(mockUser);
      const result = await service.updateUser(mockUser);
      expect(result).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      repository.delete.mockResolvedValue(undefined);
      await expect(service.deleteUser(1)).resolves.toBeUndefined();
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user if found', async () => {
      repository.findByEmail.mockResolvedValue(mockUser);
      const user = await service.findUserByEmail('john@example.com');
      expect(user).toEqual(mockUser);
    });

    it('should throw if user not found', async () => {
      repository.findByEmail.mockResolvedValue(null);
      await expect(service.findUserByEmail('notfound@example.com')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findUserById', () => {
    it('should return a user if found', async () => {
      repository.findById.mockResolvedValue(mockUser);
      const user = await service.findUserById(1);
      expect(user).toEqual(mockUser);
    });

    it('should throw if user not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.findUserById(999)).rejects.toThrow(BadRequestException);
    });
  });

  describe('validateEmail', () => {
    it('should return true for valid and unique email', async () => {
      repository.findByEmail.mockResolvedValue(null);
      const isValid = await service.validateEmail('unique@example.com');
      expect(isValid).toBe(true);
    });

    it('should return false for invalid format', async () => {
      const isValid = await service.validateEmail('bademail');
      expect(isValid).toBe(false);
    });

    it('should return false if email already exists', async () => {
      repository.findByEmail.mockResolvedValue(mockUser);
      const isValid = await service.validateEmail('john@example.com');
      expect(isValid).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return true for valid password', () => {
      expect(service.validatePassword('Password123')).toBe(true);
    });

    it('should return false for invalid password', () => {
      expect(service.validatePassword('123')).toBe(false);
    });
  });

  describe('validateUserCredentials', () => {
    it('should validate and return user', async () => {
      repository.findByEmail.mockResolvedValue({
        ...mockUser,
        password: await bcrypt.hash('password123', 10)
      });

      const result = await service.validateUserCredentials('john@example.com', 'password123');
      expect(result).toHaveProperty('id', 1);
    });

    it('should throw if credentials are invalid', async () => {
      repository.findByEmail.mockResolvedValue(mockUser);
      await expect(service.validateUserCredentials('john@example.com', 'wrongpass')).rejects.toThrow(BadRequestException);
    });
  });
});
