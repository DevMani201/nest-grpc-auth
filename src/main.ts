import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from './auth/auth.pb';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: AUTH_PACKAGE_NAME,
      protoPath: 'node_modules/grpc-proto/proto/auth.proto',
    },
  });
  await app.listen();
}
bootstrap();
