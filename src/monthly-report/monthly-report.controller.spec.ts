import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyReportController } from './monthly-report.controller';
import { MonthlyReportService } from './monthly-report.service';

describe('MonthlyReportController', () => {
  let controller: MonthlyReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyReportController],
      providers: [MonthlyReportService],
    }).compile();

    controller = module.get<MonthlyReportController>(MonthlyReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
