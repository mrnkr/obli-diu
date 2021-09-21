import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: './backend/schema.gql',
      path: 'api/graphql',
    }),
    AuthModule,
    CommonModule,
    ConfigModule,
    UsersModule,
  ],
})
export class AppModule {}
