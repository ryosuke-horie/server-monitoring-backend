import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyReportService } from './monthly-report.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Monitoring } from '../entities/monitoring.entity';

describe('MonthlyReportService', () => {
  let service: MonthlyReportService;
  let mockMonitoringRepository;

  beforeEach(async () => {
    mockMonitoringRepository = {
      find: jest.fn(),
    };

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

  describe('getMonthlyReport', () => {
    it('should return the monthly report', async () => {
      const dateYear = '202308';
      const mockData = [
        {
          target_name: 'パチンコビスタ',
          is_backup_completed: false,
          is_not_alert: false,
          is_working: false,
          record_date: '2023/08/15',
          userId: 1,
        },
      ];

      // あらかじめモックリポジトリのfindメソッドが期待通りのデータを返すように設定
      mockMonitoringRepository.find.mockImplementation((criteria) => {
        if (criteria.where.target_name === 'パチンコビスタ') {
          return Promise.resolve(mockData);
        }
        return Promise.resolve([]); // その他のターゲット名は空の配列を返す
      });

      const result = await service.getMonthlyReport(dateYear);

      expect(mockMonitoringRepository.find).toBeCalled(); // findが呼び出されたかチェック
      // 期待通りのデータが返されるかチェック
      expect(result).toEqual({
        パチンコビスタ: mockData,
        エフエス: [],
        券売機: [],
        券売機プロ: [],
        グループセッション: [],
      });
    });
  });

  // getMonthlyTargetReportに関するテストも同様に追加できます。
});
