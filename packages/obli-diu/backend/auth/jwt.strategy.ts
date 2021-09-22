import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import { User } from '../users/user.entity';
import { DatabaseModule } from '../database/database.module';
import jwtConfig from '../config/jwt.config';
import { JwtPayload } from './interfaces/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User, DatabaseModule.connName)
    private readonly users: Repository<User>,
    @Inject(jwtConfig.KEY)
    config: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
    });
  }

  async validate({ sub }: JwtPayload): Promise<User> {
    const user = await this.users.findOne(sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
