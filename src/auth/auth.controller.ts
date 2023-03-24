import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { UserDto } from 'src/dto/auth.dto';
import { AUTH_SERVICE_NAME } from './auth.pb';

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
  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  async register(user: UserDto) {
    console.log('check====>3', user);
    return this.authService.register(user);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  async login(user: UserDto) {
    const res = this.authService.generateJWT(user);
    console.log(res);
    return this.authService.login(user);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  validate(data: { token: string }) {
    return this.authService.validateToken(data.token);
  }
}
