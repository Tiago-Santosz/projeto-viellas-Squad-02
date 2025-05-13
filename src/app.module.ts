import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infra/database.module';
import { UserModule } from './modules/users/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './infra/auth/auth.module';
import { PhotoModule } from './modules/photo/photo.module';
import { CustomerModule } from './modules/customers/customer.module';
import { PurchaseModule } from './modules/purchase/purchase.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, PhotoModule, AdminModule, CustomerModule, PurchaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
