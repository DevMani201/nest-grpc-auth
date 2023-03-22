import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AuthUser {
  @Prop()
  email: string;
  @Prop()
  password: string;
}
export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
