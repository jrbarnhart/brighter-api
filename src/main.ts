import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Brighter API')
    .setDescription('Returns data about the MMORPG Brighter Shores')
    .setVersion('1.0')
    .build();

  const customOptions: SwaggerCustomOptions = {
    jsonDocumentUrl: 'api-json',
  };

  await SwaggerModule.loadPluginMetadata(metadata);
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, customOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
