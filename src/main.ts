import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'auth',
      protoPath: join(__dirname, '../src/proto/auth.proto'), //TODO change this path from github repo
    },
  });
  await app.listen();
}
bootstrap();
