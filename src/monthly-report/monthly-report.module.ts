import { Module } from '@nestjs/common';
import { MonthlyReportService } from './monthly-report.service';
import { MonthlyReportController } from './monthly-report.controller';

@Module({
  controllers: [MonthlyReportController],
  providers: [MonthlyReportService]
})
export class MonthlyReportModule {}
