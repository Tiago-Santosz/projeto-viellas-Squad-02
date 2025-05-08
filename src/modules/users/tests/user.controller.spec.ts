import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { RegisterDto } from '../dto/register.dto';
import { UpdateUserDto } from '../dto/update.dto';
import { User } from '../entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: jest.Mocked<UserService>;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedpassword',
    isDeleted: false,
    name: '',
    isVerified: false
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      userService.findUserById.mockResolvedValue(mockUser);
      const result = await controller.findById(1);
      expect(result).toEqual(mockUser);
      expect(userService.findUserById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const dto: RegisterDto = {
        email: 'new@example.com', password: '123456',
        name: ''
      };
      const createdUser = { ...mockUser, ...dto };
      userService.createUser.mockResolvedValue(createdUser);
      const result = await controller.create(dto);
      expect(result).toEqual(createdUser);
      expect(userService.createUser).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update and return the updated user', async () => {
      const dto: UpdateUserDto = { name: 'updated@example.com' };
      const updatedUser = { ...mockUser, ...dto };

      userService.findUserById.mockResolvedValue(mockUser);
      userService.updateUser.mockResolvedValue(updatedUser);

      const result = await controller.update(1, dto);
      expect(result).toEqual(updatedUser);
      expect(userService.findUserById).toHaveBeenCalledWith(1);
      expect(userService.updateUser).toHaveBeenCalledWith(updatedUser);
    });
  });
});
