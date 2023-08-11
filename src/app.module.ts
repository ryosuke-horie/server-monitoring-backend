import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ['dist/entities/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      synchronize: true,
    }),
    AuthModule,
    DatabaseModule,
    MonitoringModule,
  ],
})
export class AppModule { }
