import { Controller, Get } from '@nestjs/common';
import { SlotsService } from './slots.service';

@Controller('slots')
export class SlotsController {
    constructor(private readonly slotService: SlotsService) {}
@Get()
showDisplay():any {
    return this.slotService.showDisplay();
      }

}
