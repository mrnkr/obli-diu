
import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(returns => User)
  async user(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(returns => User)
  async createUser(@Args('input') args: CreateUserDto): Promise<User> {
    const createdUser = await this.usersService.create(args);
    return createdUser;
  }
}
