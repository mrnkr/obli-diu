import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: './backend/schema.gql',
      path: 'api/graphql',
    }),
    UsersModule,
  ],
})
export class AppModule {}
