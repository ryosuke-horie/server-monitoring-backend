import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMonitoringDto {
  @IsString()
  @IsNotEmpty()
  target_name: string;

  @IsNotEmpty()
  is_backup_completed: string;

  @IsNotEmpty()
  is_not_alert: string;

  @IsNotEmpty()
  is_working: string;

  @IsNotEmpty()
  @IsString()
  record_date: string;

  @IsString()
  @IsNotEmpty()
  updated_at: string;
}
