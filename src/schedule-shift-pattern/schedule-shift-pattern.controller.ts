import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Prisma, ScheduleShiftPattern } from '@prisma/client';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/roles.enum';
import { RolesGuard } from 'src/role/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ScheduleInputDto } from './schedule-input.dto';
import { ScheduleShiftPatternService } from './schedule-shift-pattern.service';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('schedule')
export class ScheduleShiftPatternController {
  constructor(
    private scheduleShiftPatternService: ScheduleShiftPatternService,
  ) {}

  @Roles(Role.Boss)
  @ApiProperty({type:ScheduleInputDto})
  @Post('create')
  async create(
    @Body() scheduleInput: ScheduleInputDto,
  ): Promise<ScheduleShiftPattern> {
    return this.scheduleShiftPatternService.createScheduleShiftPattern({
      User: {
        connect: {
          id: scheduleInput.guard_id,
        },
      },
      Place: {
        connect: {
          id: scheduleInput.place_id,
        },
      },
      date: scheduleInput.date,
      repeat_when: scheduleInput.repeat_when,
    });
  }
}
