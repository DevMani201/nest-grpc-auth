import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserSchema } from 'src/schema/auth.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Microservice-grpc-new'),
    MongooseModule.forFeature([
      {
        name: 'user',
        collection: 'user-collection',
        schema: AuthUserSchema,
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'mynameismanish11111',
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
