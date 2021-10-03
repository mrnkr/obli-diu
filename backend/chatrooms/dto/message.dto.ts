import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { IDField } from '@nestjs-query/query-graphql';
import { UserDto } from '../../users/dto/user.dto';

@ObjectType()
export class MessageDto {
  @IDField((type) => ID)
  id: string;

  @Field()
  body: string;

  @Field((type) => UserDto)
  sender: UserDto;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;
}
