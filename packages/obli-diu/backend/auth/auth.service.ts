import { UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { DatabaseModule } from '../database/database.module';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User, DatabaseModule.connName)
    private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.users.findOne({ where: { email } });
    const passwordsMatch = await user?.checkPassword(password);

    if (!user || !passwordsMatch) {
      throw new UnauthorizedException();
    }

    return this.jwt.signAsync({ email }, { subject: `${user.id}` });
  }
}
