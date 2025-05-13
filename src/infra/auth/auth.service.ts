import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../modules/users/user.service';
import { LoginDto, LoginResponseDto } from '../../modules/users/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    
    const user = await this.usersService.findUserByEmail(email);
   
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
    }
      
    const { password: _, ...payload } = user;

    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email });
    const refreshToken = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '7d' },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
