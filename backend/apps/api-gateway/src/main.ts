import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(3000);
  console.log('API Gateway running on port 3000');
}

bootstrap();
