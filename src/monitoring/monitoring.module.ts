import { Module } from '@nestjs/common';
import { MonitoringController } from './monitoring.controller';
import { MonitoringService } from './monitoring.service';

@Module({
  controllers: [MonitoringController],
  providers: [MonitoringService]
})
export class MonitoringModule {}
