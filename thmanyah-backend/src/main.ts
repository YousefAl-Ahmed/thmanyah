import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  // bufferLogs helps if you later plug a logger (e.g., Pino)
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Security & performance middleware (Express)
  app.use(helmet({ contentSecurityPolicy: false })); // CSP off by default; tune later
  app.use(compression());

  // Global validation (keeps your existing behavior)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      forbidNonWhitelisted: false,
      validateCustomDecorators: true,
    }),
  );

  // CORS: local dev + Vercel previews + your prod domain (add when you have one)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      /https:\/\/.*\.vercel\.app$/, // all Vercel preview URLs
      // 'https://your-prod-domain.com', // add later if needed
    ],
    methods: ['GET', 'HEAD', 'OPTIONS'],
    credentials: true,
  });

  // If you use Prisma, enable graceful shutdown (optional)
  // try {
  //   const prisma = app.get(PrismaService);
  //   await prisma.enableShutdownHooks(app);
  // } catch {}

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`API listening on http://localhost:${port}`);
}

bootstrap();
