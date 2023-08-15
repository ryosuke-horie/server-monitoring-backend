import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyReportService } from './monthly-report.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Monitoring } from '../entities/monitoring.entity';

describe('MonthlyReportService', () => {
  let service: MonthlyReportService;
  let mockMonitoringRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonthlyReportService,
        {
          provide: getRepositoryToken(Monitoring),
          useValue: mockMonitoringRepository,
        },
      ],
    }).compile();

    service = module.get<MonthlyReportService>(MonthlyReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
