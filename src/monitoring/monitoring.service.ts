import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitoring } from '../entities/monitoring.entity';
import { Repository } from 'typeorm';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class MonitoringService {
  /**
   * コンストラクタ
   * @param monitoringRepository
   */
  constructor(
    @InjectRepository(Monitoring)
    private monitoringRepository: Repository<Monitoring>,
  ) {}

  /**
   * 監視記録を作成する
   * @param createMonitoringDto
   * @param user
   * @returns Promise<Monitoring>
   */
  async create(
    createMonitoringDto: CreateMonitoringDto,
    user: User,
  ): Promise<Monitoring> {
    const {
      target_name,
      target_ip,
      is_backup_completed,
      is_not_alert,
      is_working,
      record_date,
      created_at,
      updated_at,
    } = createMonitoringDto;

    const monitoring = this.monitoringRepository.create({
      target_name,
      target_ip,
      is_backup_completed,
      is_not_alert,
      is_working,
      record_date,
      created_at,
      updated_at,
      user,
    });

    await this.monitoringRepository.save(monitoring);

    return monitoring;
  }
}
