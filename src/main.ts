import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const options = new DocumentBuilder()
    .setTitle('Diploma API')
    .setDescription('API used for diploma.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3001)
}
bootstrap();
