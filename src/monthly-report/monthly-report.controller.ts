import { ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { MonthlyReportService } from './monthly-report.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('monthly-report')
export class MonthlyReportController {
  constructor(private readonly monthlyReportService: MonthlyReportService) {}

  /**
   * 月報取得
   * /monthly-report/202001の形式でアクセスされたら、2020年1月の月報を返す 
   * @param dateYear 
   * @returns 
   */
  @Get()
  @UseInterceptors(ClassSerializerInterceptor) // responseを返す前に、passwordを除外する
  @UseGuards(JwtAuthGuard)
  async getMonthlyReport(@Query('dateYear') dateYear:string) {
    console.log('dateYear', dateYear);
    return await this.monthlyReportService.getMonthlyReport(dateYear);
  }
}
