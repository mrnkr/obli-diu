import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { CommonModule } from '../common/common.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [DatabaseModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
  exports: [DatabaseModule],
})
export class UsersModule {}
