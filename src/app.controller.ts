import { Controller, Get } from '@nestjs/common';

/**
 * 動作していることがわかるようにTOPページのみ用意。
 */
@Controller()
export class AppController {
  @Get()
  is_working(): string {
    return "Hello I'm Working!";
  }
}
