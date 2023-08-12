import { Body, ClassSerializerInterceptor, Controller, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { GetUser } from './decorators/monitoring.decorator';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { User } from '../entities/user.entity';
import { Monitoring } from '../entities/monitoring.entity';


@Controller('monitoring')
@UseInterceptors(ClassSerializerInterceptor) // responseを返す前に、passwordを除外する
@UseGuards(JwtAuthGuard)
export class MonitoringController {
    constructor(private readonly monitoringService: MonitoringService) { }

    @Post()
    async create(
        @Body() createMonitoringDto: CreateMonitoringDto,
        @GetUser() user: User,
    ): Promise<Monitoring> {
        return await this.monitoringService.create(createMonitoringDto, user);
    }
}
