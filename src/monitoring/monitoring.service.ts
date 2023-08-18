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
   * リクエストされた日の登録済みのデータを返す
   * @param date // 検索対象の日付 例:20230101
   * @returns Promise<Monitoring[]>
   */
  async find(date: string): Promise<Monitoring[]> {
    // 検索用に日付を整形する。例:20230101 → 2023/01/01
    const queryDate = date.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3');

    // 検索対象の日付のデータを取得する
    const monitoring = await this.monitoringRepository.find({
      select: {
        target_name: true,
        is_backup_completed: true,
        is_not_alert: true,
        is_working: true,
      },
      where: { record_date: queryDate }
    });

    return monitoring;
  }

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
