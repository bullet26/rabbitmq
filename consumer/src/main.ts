import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const start = async () => {
  const PORT = process.env.PORT || 5001;
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);
  app.enableCors({});

  await app.listen(PORT, () => logger.log(`Server started on port = ${PORT}`));
};

void start();
