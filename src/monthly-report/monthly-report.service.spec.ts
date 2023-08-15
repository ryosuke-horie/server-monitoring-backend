import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyReportService } from './monthly-report.service';

describe('MonthlyReportService', () => {
  let service: MonthlyReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyReportService],
    }).compile();

    service = module.get<MonthlyReportService>(MonthlyReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
