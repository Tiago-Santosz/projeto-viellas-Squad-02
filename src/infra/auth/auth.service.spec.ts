import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../modules/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: Partial<Record<keyof UserService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  const mockUser = {
    id: 'user123',
    email: 'test@example.com',
    password: 'hashedPassword',
    name: 'Test User',
  };

  beforeEach(async () => {
    userService = {
      findUserByEmail: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('fake-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return tokens when credentials are valid', async () => {
    const loginDto = { email: mockUser.email, password: 'plainPassword' };

    if (!userService.findUserByEmail) {
      throw new Error('userService.findUserByEmail is not defined');
    }
    userService.findUserByEmail.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const result = await authService.signIn(loginDto);

    expect(userService.findUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
    expect(jwtService.sign).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      accessToken: 'fake-token',
      refreshToken: 'fake-token',
    });
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    if (!userService.findUserByEmail) {
      throw new Error('userService.findUserByEmail is not defined');
    }
    userService.findUserByEmail.mockResolvedValue(null); 

    await expect(
      authService.signIn({ email: 'invalid@example.com', password: '123456' }),
    ).rejects.toThrow(UnauthorizedException);
  });


  it('should throw UnauthorizedException if password is incorrect', async () => {
    if (!userService.findUserByEmail) {
      throw new Error('userService.findUserByEmail is not defined');
    }
    userService.findUserByEmail.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    await expect(
      authService.signIn({ email: mockUser.email, password: 'wrongPassword' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
