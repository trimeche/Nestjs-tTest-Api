import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // This makes every route start with /api
  app.setGlobalPrefix('api');
  
  // Listen on all interfaces (0.0.0.0) so Docker can see it
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
