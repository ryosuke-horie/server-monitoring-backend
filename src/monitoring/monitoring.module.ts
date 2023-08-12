import { Module } from '@nestjs/common';
import { MonitoringController } from './monitoring.controller';
import { MonitoringService } from './monitoring.service';
import { Monitoring } from 'src/entities/monitoring.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

/**
 * 監視記録用のモジュール
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Monitoring]),
    AuthModule,
  ],
  controllers: [MonitoringController],
  providers: [MonitoringService]
})
export class MonitoringModule {}
