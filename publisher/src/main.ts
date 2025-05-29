import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);
  app.enableCors({});
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Publisher API')
    .setDescription('The publisher API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(PORT, () => logger.log(`Server started on port = ${PORT}`));
};

void start();
