import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './presentation/interceptors/response.interceptor';
import { GlobalExceptionFilter } from './presentation/filters/global-exception.filter';
import { BusinessErrorExceptionFilter } from './presentation/filters/business-error-exception.filter';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { BusinessErrorException } from './presentation/exceptions/business-error.exception';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Your API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new BusinessErrorExceptionFilter(),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use(compression());
  app.use(helmet());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
function compression(): any {
  throw new Error('Function not implemented.');
}
