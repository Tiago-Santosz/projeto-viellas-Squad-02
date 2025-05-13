import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';
import { LoginDto } from 'src/modules/users/dto/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: Partial<Record<keyof AuthService, jest.Mock>>;

  beforeEach(async () => {
    authService = {
      signIn: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    })
      .overrideGuard(AuthGuard) // mockando o guard
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return access and refresh tokens on valid login', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockTokens = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };

      authService.signIn!.mockResolvedValue(mockTokens);

      const result = await authController.login(loginDto);

      expect(authService.signIn).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(mockTokens);
    });
  });

  describe('getProfile', () => {
    it('should return the user from the request object', () => {
      const mockUser = { id: 'user123', email: 'user@example.com' };
      const mockRequest = { user: mockUser };

      const result = authController.getProfile(mockRequest);

      expect(result).toEqual(mockUser);
    });
  });
});
