import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma, ScheduleShiftPattern } from '@prisma/client';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/roles.enum';
import { RolesGuard } from 'src/role/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ScheduleInputDto } from './schedule-input.dto';
import { ScheduleShiftPatternService } from './schedule-shift-pattern.service';
import { ScheduleUpdateDto } from './schedule-update.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('schedule')
@ApiTags('schedule')
export class ScheduleShiftPatternController {
  private readonly logger = new Logger(ScheduleShiftPatternController.name);
  constructor(
    private scheduleShiftPatternService: ScheduleShiftPatternService,
  ) {}

  @Roles(Role.Boss)
  @ApiProperty({ type: ScheduleInputDto })
  @Post('create')
  async create(
    @Body() scheduleInput: ScheduleInputDto,
  ): Promise<ScheduleShiftPattern> {
    this.logger.log(scheduleInput, 'create');
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

  @Post('update')
  @ApiProperty({ type: ScheduleUpdateDto })
  async update(@Body() scheduleUpdateDto: ScheduleUpdateDto) {
    return this.scheduleShiftPatternService.updateScheduleShiftPattern({
      where: {
        id: scheduleUpdateDto.id,
      },
      data: scheduleUpdateDto,
    });
  }
}
