import { Module } from '@nestjs/common';
import { DrinkModule } from './modules/drink/drink.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, DrinkModule, CommentModule, AuthModule],
})
export class AppModule {}
