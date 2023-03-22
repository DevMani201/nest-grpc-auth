import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUser } from 'src/schema/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('user')
    private userModel: Model<AuthUser>,
  ) {}

  async generateJWT(request): Promise<any> {
    const payload = {
      sub: request.email,
      userId: request.email,
    };
    const jwtOptions = {
      secret: 'mynameismanish11111',
      privateKey: 'mynameismanish11111',
    };

    return this.jwtService.sign(payload, jwtOptions);
  }

  async getPayloadData(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }
  async validateToken(jwt: string) {
    try {
      const res = await this.jwtService.verify(jwt);
      console.log(res);
      return {
        status: HttpStatus.OK,
        error: null,
      };
    } catch (err) {
      console.log(err);
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['invalid token'],
      };
    }
  }

  async register(user: UserDto) {
    const modelData = new this.userModel(user);
    modelData.save();
    if (modelData) {
      return {
        status: 201,
        error: null,
      };
    }
  }

  async login(user: UserDto) {
    const data = await this.userModel.findOne({
      email: user.email,
    });
    console.log(data);
    if (!data) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['E-Mail not found'],
        token: null,
      };
    }
    if (data) {
      const res = await this.generateJWT(user);
      console.log('inside token', res);
      return {
        status: HttpStatus.OK,
        error: null,
        token: res,
      };
    }
  }
}
