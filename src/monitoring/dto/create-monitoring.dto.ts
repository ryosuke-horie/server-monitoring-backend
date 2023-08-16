import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateMonitoringDto {
  @IsString()
  @IsNotEmpty()
  target_name: string;

  @IsString()
  @IsNotEmpty()
  target_ip: string;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsNotEmpty()
  @IsBoolean()
  is_backup_completed: boolean;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsNotEmpty()
  @IsBoolean()
  is_not_alert: boolean;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsNotEmpty()
  @IsBoolean()
  is_working: boolean;

  @IsNotEmpty()
  @IsString()
  record_date: string;

  @IsString()
  @IsNotEmpty()
  created_at: string;

  @IsString()
  @IsNotEmpty()
  updated_at: string;
}
