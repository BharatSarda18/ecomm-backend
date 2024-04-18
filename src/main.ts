import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const configService: ConfigService = app.get(ConfigService);
  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe());
  // app.enableCors({
  //   origin: [configService.get(ENV.ALLOW_ORIGIN)],
  // });
  await app.listen(process.env.PORT);
}
bootstrap();
