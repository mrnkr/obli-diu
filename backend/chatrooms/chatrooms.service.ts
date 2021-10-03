import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../users/user.entity';
import { Chatroom } from './chatroom.entity';
import { Message } from './message.entity';
import { SendMessage } from './interfaces/send-message.interface';

@Injectable()
export class ChatroomsService {
  constructor(
    @InjectModel(Chatroom)
    private readonly ChatroomModel: ModelType<Chatroom>,
    @InjectModel(User)
    private readonly UserModel: ModelType<User>,
  ) {}

  async createChatroom(userIds: string[]): Promise<Chatroom> {
    await this.assertUsersExist(userIds);
    let chatroom = new this.ChatroomModel({
      users: userIds,
    });
    chatroom = await chatroom.save();
    return chatroom;
  }

  private async assertUsersExist(userIds: string[]): Promise<void> {
    const users = await this.UserModel.find({ id: { $in: userIds } });
    if (users.length !== userIds.length && userIds.length > 0) {
      throw new NotFoundException(
        'Not all users could be found to create the chatroom',
      );
    }
  }

  async getChatroomsForUser(userId: string): Promise<Chatroom[]> {
    const chatrooms = await this.ChatroomModel.find({
      users: userId,
    } as any).sort({ updatedAt: -1 });
    return chatrooms;
  }

  async getChatroomById(chatroomId: string, userId: string): Promise<Chatroom> {
    const chatroom = await this.ChatroomModel.findOne({
      _id: chatroomId,
      users: userId,
    } as any);
    if (!chatroom) {
      throw new NotFoundException(`Chatroom with id=${chatroomId} not found`);
    }
    return chatroom;
  }

  async sendMessageToChatroom(
    data: SendMessage,
  ): Promise<[Message, Chatroom, string]> {
    const chatroom = await this.ChatroomModel.findOne({
      _id: data.chatroomId,
      users: data.senderId,
    } as any);

    if (!chatroom) {
      throw new NotFoundException(
        `Chatroom with id=${data.chatroomId} not found`,
      );
    }

    const message = new Message(data.messageBody, data.senderId);
    chatroom.addMessage(message);
    await chatroom.save();

    const recipientId = chatroom.users
      .map((user) => user.id as string)
      .find((uid) => uid !== data.senderId);

    return [message, chatroom, recipientId];
  }
}
