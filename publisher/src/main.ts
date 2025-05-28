import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);
  app.enableCors({});
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => logger.log(`Server started on port = ${PORT}`));
};

void start();
