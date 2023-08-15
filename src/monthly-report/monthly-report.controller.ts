import { Controller, Get, Param } from '@nestjs/common';
import { MonthlyReportService } from './monthly-report.service';

@Controller('monthly-report')
export class MonthlyReportController {
  constructor(private readonly monthlyReportService: MonthlyReportService) {}

  @Get()
  findAll() {
    return this.monthlyReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthlyReportService.findOne(+id);
  }
}
