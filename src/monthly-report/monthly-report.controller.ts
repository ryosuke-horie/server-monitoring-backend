import { Controller, Get, Param } from '@nestjs/common';
import { MonthlyReportService } from './monthly-report.service';

@Controller('monthly-report')
export class MonthlyReportController {
  constructor(private readonly monthlyReportService: MonthlyReportService) {}

  /**
   * 月報取得
   * /monthly-report/2020-01の形式でアクセスされたら、2020年1月の月報を返す 
   * @param dateYear 
   * @returns 
   */
  @Get(':date-year')
  async getMonthlyReport(@Param('date-year') dateYear: string) {
    return await this.monthlyReportService.getMonthlyReport(dateYear);
  }
}
