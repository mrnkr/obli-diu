import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../user.entity';

@InputType()
export class CreateUserDto {
  @IsString()
  @Field()
  displayName: string;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;

  toModel(): User {
    const ret = new User();

    ret.displayName = this.displayName;
    ret.email = this.email;
    ret.password = this.password;

    return ret;
  }
}
