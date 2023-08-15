import { Injectable } from '@nestjs/common';

@Injectable()
export class MonthlyReportService {
  findAll() {
    return `This action returns all monthlyReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthlyReport`;
  }
}
