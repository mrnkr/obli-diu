import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@ObjectType()
@Entity()
export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  displayName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
