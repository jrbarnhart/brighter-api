import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import metadata from './metadata';
import { WinstonModule } from 'nest-winston';
import { instance } from './logger/winston.logger';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({ instance: instance }),
  });

  // Security
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Serve static assets
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Brighter API')
    .setDescription('Returns data about the MMORPG Brighter Shores')
    .setVersion('1.0')
    .build();

  const swaggerCustomOptions: SwaggerCustomOptions = {
    jsonDocumentUrl: 'api-json',
    customCss: `
      :root {
      --bg-color: #0f1115;
      --primary-color: #f0f2f5;
      --secondary-color:rgb(184, 199, 219);
      --accent: #3b82f6;
      --get-background: #dcedff;
      --post-background: #defaee;
      --delete-background: #f7e0e0;
      --model-background: #333333;
      --prop-type-color:rgb(158, 195, 255);
    }

    body {
      background-color: var(--bg-color);
      color-scheme: dark;
    }

    .swagger-ui .title {
      color: var(--accent) !important;
    }

    .swagger-ui .model-title {
      color: var(--primary-color);
    }

    .topbar {
      display: none;
    }

    .swagger-ui .info li, .swagger-ui .info p, .swagger-ui .info table {
      color: var(--secondary-color);
    }

    .swagger-ui .opblock.opblock-get {
      background-color: var(--get-background);
    }

    .swagger-ui .opblock.opblock-post,
    .swagger-ui .opblock.opblock-patch {
      background-color: var(--post-background);
    }

    .swagger-ui .opblock.opblock-delete {
      background-color: var(--delete-background);
    }

    .swagger-ui .opblock-tag.no-desc span {
      color: var(--primary-color);
    }

    .swagger-ui section.models h4 span {
      color: var(--primary-color);
    }

    .swagger-ui .model {
      color: var(--primary-color);
      }
      
    .swagger-ui .model-box {    
      background-color: var(--model-background)
    }

    .swagger-ui .model-toggle:after {
      filter: invert(1);
    }

    .swagger-ui .prop-type {
      color: var(--prop-type-color);
    }

    .swagger-ui .model .property.primitive,
    .swagger-ui .model .renderedMarkdown p {
      color: var(--secondary-color);
    }
    `,
  };

  await SwaggerModule.loadPluginMetadata(metadata);
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory, swaggerCustomOptions);

  // Required for health check
  app.enableShutdownHooks();
  // Required for throttler
  app.set('trust proxy', 'loopback');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
