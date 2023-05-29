import { Module } from '@nestjs/common';
import { DrinkModule } from './infra/modules/drink/drink.module';
import { CommentModule } from './infra/modules/comment/comment.module';
import { AuthModule } from './infra/modules/auth/auth.module';
import { UserModule } from './infra/modules/user/user.module';

@Module({
  imports: [UserModule, DrinkModule, CommentModule, AuthModule],
})
export class AppModule {}
