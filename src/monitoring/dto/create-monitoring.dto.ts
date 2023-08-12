import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMonitoringDto {
    @IsString()
    @IsNotEmpty()
    target_name: string;
    
    @IsString()
    @IsNotEmpty()
    target_ip: string;

    // @IsBoolean()
    @IsNotEmpty()
    is_backup_completed: boolean;

    // @IsBoolean()
    @IsNotEmpty()
    is_not_alert: boolean;

    // @IsBoolean()
    @IsNotEmpty()
    is_working: boolean;

    @IsString()
    @IsNotEmpty()
    created_at: string;

    @IsString()
    @IsNotEmpty()
    updated_at: string;
}