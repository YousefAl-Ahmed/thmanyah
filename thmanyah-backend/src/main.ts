import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // auto-cast query strings -> numbers
      whitelist: true, // strip unknown fields
      forbidNonWhitelisted: false,
    }),
  );

  // allow requests from your Next.js app during local dev
  app.enableCors();

  // run on 3001 (or PORT env var in prod)
  await app.listen(process.env.PORT ?? 3001);
  console.log(`API listening on http://localhost:${process.env.PORT ?? 3001}`);
}

void bootstrap();
