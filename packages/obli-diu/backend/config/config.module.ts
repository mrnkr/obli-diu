import { Global, Module } from '@nestjs/common';
import { ConfigModule as NativeConfigModule } from '@nestjs/config';
import jwtConfig from './jwt.config';

@Module({
  imports: [NativeConfigModule.forRoot({ isGlobal: true, load: [jwtConfig] })],
})
export class ConfigModule {}
