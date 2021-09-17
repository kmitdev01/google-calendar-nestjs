import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlotsController } from './slots/slots.controller';
import { SlotsService } from './slots/slots.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, SlotsController],
  providers: [AppService, SlotsService],
})
export class AppModule {}
