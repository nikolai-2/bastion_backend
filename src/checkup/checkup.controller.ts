
import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CheckupService } from './checkup.service';
import { CheckupItemDto } from './checkup-item.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('checkup')
@ApiTags('checkup')
export class CheckupController {
  constructor(private checkupService: CheckupService) {}

  @Get(':date/getList')
  @ApiResponse({description:"https://pastebin.com/vkwwUwDJ"})
  async getList(
    @Request() req,
    @Param('date') date: string,
  ): Promise<CheckupItemDto[]> {
    return await this.checkupService.getList(req.user, date);
  }
}
