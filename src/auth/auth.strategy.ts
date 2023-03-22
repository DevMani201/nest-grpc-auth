import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'mynameismanish11111',
    });
  }

  async validate(payload: { email: string }) {
    console.log('payload1========>', payload);
    return {
      username: payload.email,
      userId: payload.email,
    };
  }
}
