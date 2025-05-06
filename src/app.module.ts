import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infra/database.module';
import { UserModule } from './modules/users/user.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [DatabaseModule, UserModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
