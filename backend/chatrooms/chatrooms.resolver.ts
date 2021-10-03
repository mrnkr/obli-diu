import { Mutation, Resolver, Args, Subscription, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../users/user.entity';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Chatroom } from './chatroom.entity';
import { ChatroomsService } from './chatrooms.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { Message } from './message.entity';
import { SendMessageDto } from './dto/send-message.dto';

const pubSub = new PubSub();

@Resolver((of) => Chatroom)
@UseGuards(GqlAuthGuard)
export class ChatroomsResolver {
  constructor(private readonly chatroomsService: ChatroomsService) {}

  @Query((returns) => Chatroom)
  async chatroom(
    @Args('id') chatroomId: string,
    @CurrentUser() currentUser: User,
  ): Promise<Chatroom> {
    const chatroom = await this.chatroomsService.getChatroomById(
      chatroomId,
      currentUser.id,
    );
    return chatroom;
  }

  @Query((returns) => [Chatroom])
  async chatrooms(@CurrentUser() currentUser: User): Promise<Chatroom[]> {
    const chatrooms = await this.chatroomsService.getChatroomsForUser(
      currentUser.id,
    );
    return chatrooms;
  }

  @Mutation((returns) => Chatroom)
  async createChatroom(
    @Args('input') { userId }: CreateChatroomDto,
    @CurrentUser() currentUser: User,
  ): Promise<Chatroom> {
    const chatroom = await this.chatroomsService.createChatroom([
      userId,
      currentUser.id,
    ]);

    pubSub.publish(`chatroomUpdated_${userId}`, chatroom);
    pubSub.publish(`chatroomUpdated_${currentUser.id}`, chatroom);

    return chatroom;
  }

  @Mutation((returns) => Message)
  async sendMessage(
    @Args('input') input: SendMessageDto,
    @CurrentUser() currentUser: User,
  ): Promise<Message> {
    const [message, chatroom, recipientId] =
      await this.chatroomsService.sendMessageToChatroom({
        chatroomId: input.chatroomId,
        messageBody: input.messageBody,
        senderId: currentUser.id,
      });

    pubSub.publish(`chatroomUpdated_${currentUser.id}`, chatroom);
    pubSub.publish(
      `messageReceived_${recipientId}_${input.chatroomId}`,
      message,
    );

    return message;
  }

  @Subscription((returns) => Chatroom)
  chatroomUpdated(@CurrentUser() currentUser: User) {
    return pubSub.asyncIterator(`chatroomUpdated_${currentUser.id}`);
  }

  @Subscription((returns) => Message)
  messageReceived(
    @Args('chatroomId') chatroomId: string,
    @CurrentUser() currentUser: User,
  ) {
    return pubSub.asyncIterator(
      `messageReceived_${currentUser.id}_${chatroomId}`,
    );
  }
}
