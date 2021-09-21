import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseModule } from '../database/database.module';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, DatabaseModule.connName)
    private readonly users: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.users.save(dto.toModel());
  }

  async findAll(): Promise<User[]> {
    return this.users.find();
  }

  async findOneById(id: number): Promise<User> {
    return this.users.findOne(id);
  }
}
