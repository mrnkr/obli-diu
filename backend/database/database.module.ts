import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { nanoid } from 'nanoid/non-secure';
import { getConnectionOptions } from 'typeorm';

@Module({})
export class DatabaseModule {
  static connName = nanoid();

  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          name: DatabaseModule.connName,
          useFactory: async () =>
            Object.assign(await getConnectionOptions(), {
              autoLoadEntities: true,
            }),
        }),
      ],
    };
  }

  static forFeature(entities: EntityClassOrSchema[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forFeature(entities, DatabaseModule.connName)],
      exports: [TypeOrmModule],
    };
  }
}
