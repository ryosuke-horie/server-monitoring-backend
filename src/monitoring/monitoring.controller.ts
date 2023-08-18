import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { GetUser } from './decorators/monitoring.decorator';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { User } from '../entities/user.entity';
import { Monitoring } from '../entities/monitoring.entity';

@Controller('monitoring')
@UseInterceptors(ClassSerializerInterceptor) // responseを返す前にpasswordを除外する
@UseGuards(JwtAuthGuard)
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) { }

  /**
   * リクエストされた日の登録済みのデータを返す
   * @param date // 検索対象の日付 例:20230101
   * @returns Promise<Monitoring[]>
   */
  @Get()
  async find(@Query('date') date: string): Promise<Monitoring[]> {
    return await this.monitoringService.find(date);
  }

  /**
   * 登録済みのデータを作成する
   * @param createMonitoringDto 
   * @param user 
   * @returns 
   */
  @Post()
  async create(
    @Body() createMonitoringDto: CreateMonitoringDto,
    @GetUser() user: User,
  ): Promise<Monitoring> {
    return await this.monitoringService.create(createMonitoringDto, user);
  }
}
