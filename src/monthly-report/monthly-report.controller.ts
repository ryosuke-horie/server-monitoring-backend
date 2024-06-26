import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MonthlyReportService } from './monthly-report.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';

/**
 * 月別レポート用APIのコントローラー
 * ここでは読み取りのみを行う
 */
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
  async getMonthlyReport(@Query('dateYear') dateYear: string) {
    if (typeof dateYear !== 'string') {
      throw new BadRequestException('日時は文字列で指定してください');
    }
    return await this.monthlyReportService.getMonthlyReport(dateYear);
  }
}
