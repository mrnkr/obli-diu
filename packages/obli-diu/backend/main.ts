import 'reflect-metadata';
import * as http from 'http';
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NextApiHandler } from 'next';
import { AppModule } from './app.module';

export module Backend {
  let app: INestApplication;

  export const getApp = async () => {
    if (!app) {
      app = await NestFactory.create(AppModule, { bodyParser: false });
      app.useGlobalPipes(new ValidationPipe({ transform: true }));
      await app.init();
    }

    return app;
  };

  export const getListener = async () => {
    const app = await getApp();
    const server: http.Server = app.getHttpServer();
    const [listener] = server.listeners('request') as NextApiHandler[];
    return listener;
  };
}
