import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringService } from './monitoring.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Monitoring } from '../entities/monitoring.entity';

describe('MonitoringService', () => {
  let service: MonitoringService;
  let mockMonitoringRepository;

  beforeEach(async () => {
    mockMonitoringRepository = {
      create: jest.fn().mockImplementation(data => data),
      save: jest.fn().mockImplementation(data => Promise.resolve(data)),
      // 他のモック化するメソッドやプロパティをこちらに追加します
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonitoringService,
        { provide: getRepositoryToken(Monitoring), useValue: mockMonitoringRepository },
      ],
    }).compile();

    service = module.get<MonitoringService>(MonitoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should create a monitoring record', async () => {
  //   const createMonitoringDto = {
  //     target_name: 'Test Name',
  //     target_ip: '127.0.0.1',
  //     is_backup_completed: true,
  //     is_not_alert: false,
  //     is_working: true,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   };

  //   const user = { id: 1, name: 'Test User' }; // モックユーザー

  //   const result = await service.create(createMonitoringDto, user);

  //   expect(mockMonitoringRepository.create).toBeCalledWith({
  //     ...createMonitoringDto,
  //     user,
  //   });
  //   expect(mockMonitoringRepository.save).toBeCalledWith(result);
  //   expect(result).toEqual({ ...createMonitoringDto, user });
  // });

  // // 他のテストケースをこちらに追加します
});
