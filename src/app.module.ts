import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infra/database.module';
import { UserModule } from './modules/users/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
