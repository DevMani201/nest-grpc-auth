import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { UserDto } from 'src/dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @GrpcMethod('AuthService', 'Login')
  //   async login(reqs: any) {
  //     try {
  //       const res = await this.authService.generateJWT(reqs);

  //       return res;
  //     } catch (e) {
  //       console.log(e);
  //       return false;
  //     }
  //   }
  @GrpcMethod('AuthService', 'Register')
  async register(user: UserDto) {
    console.log('check====>3', user);
    return this.authService.register(user);
  }

  @GrpcMethod('AuthService', 'Login')
  async login(user: UserDto) {
    const res = this.authService.generateJWT(user);
    console.log(res);
    return this.authService.login(user);
  }

  @GrpcMethod('AuthService', 'Validate')
  validate(data: { token: string }) {
    return this.authService.validateToken(data.token);
  }
}
