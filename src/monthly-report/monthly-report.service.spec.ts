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
      createQueryBuilder: jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
      })),
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

  describe('MonthlyReportService', () => {
    let service: MonthlyReportService;
    let mockMonitoringRepository;
    let mockQueryBuilder;
  
    beforeEach(async () => {
      mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
      };
  
      mockMonitoringRepository = {
        find: jest.fn(),
        createQueryBuilder: jest.fn(() => mockQueryBuilder),
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
            user: {
              username: 'testuser',
            },
          },
        ];
  
        mockQueryBuilder.getMany.mockResolvedValueOnce(mockData).mockResolvedValueOnce([]).mockResolvedValue([]);
  
        const result = await service.getMonthlyReport(dateYear);
  
        expect(mockMonitoringRepository.createQueryBuilder).toBeCalled();
        expect(mockQueryBuilder.getMany).toHaveBeenCalledTimes(5);
        expect(result).toEqual({
          パチンコビスタ: mockData,
          エフエス: [],
          券売機: [],
          券売機プロ: [],
          グループセッション: [],
        });
      });
    });
  });
  
});
