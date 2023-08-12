import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringController } from './monitoring.controller';
import { MonitoringService } from './monitoring.service';

describe('MonitoringController', () => {
  let controller: MonitoringController;
  let mockMonitoringService;

  beforeEach(async () => {
    mockMonitoringService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitoringController],
      providers: [
        { provide: MonitoringService, useValue: mockMonitoringService },
      ],
    }).compile();

    controller = module.get<MonitoringController>(MonitoringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a monitoring record and return it', async () => {
      const currentDate = new Date().toISOString(); // Date型をISO文字列に変換

      const mockMonitoringRecord = {
        id: 1,
        target_name: 'Test Name',
        target_ip: '127.0.0.1',
        is_backup_completed: true,
        is_not_alert: false,
        is_working: true,
        created_at: currentDate,
        updated_at: currentDate,
      };
      mockMonitoringService.create.mockResolvedValue(mockMonitoringRecord);

      const createMonitoringDto = {
        target_name: 'Test Name',
        target_ip: '127.0.0.1',
        is_backup_completed: true,
        is_not_alert: false,
        is_working: true,
        created_at: currentDate,
        updated_at: currentDate,
      };

      const user = {
        id: 1,
        username: 'Test User',
        email: 'test@example.com',
        password: 'test1234',
        monitorings: [],
      };

      const result = await controller.create(createMonitoringDto, user);

      expect(mockMonitoringService.create).toHaveBeenCalledWith(
        createMonitoringDto,
        user,
      );
      expect(result).toEqual(mockMonitoringRecord);
    });
  });
});
