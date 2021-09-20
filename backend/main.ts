import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as http from 'http';
import { NextApiHandler } from 'next';
import { AppModule } from './app.module';

export module Backend {
  let app: INestApplication;

  export async function getApp() {
    if (!app) {
      app = await NestFactory.create(AppModule, { bodyParser: false });
      app.useGlobalPipes(new ValidationPipe());
      await app.init();
    }

    return app;
  }

  export async function getListener() {
    const app = await getApp();
    const server: http.Server = app.getHttpServer();
    const [ listener ] = server.listeners('request') as NextApiHandler[];
    return listener;
  }
}
