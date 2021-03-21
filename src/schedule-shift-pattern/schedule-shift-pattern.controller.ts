import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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
    console.log(scheduleUpdateDto);
    const { guard_id, date, ...o } = scheduleUpdateDto;

    return this.scheduleShiftPatternService.updateScheduleShiftPattern({
      where: {
        id: o.id,
      },
      data: {
        ...o,
        date: new Date(date),
        user_id: guard_id,
      },
    });
  }

  @Get(':id/delete')
  @ApiProperty()
  async delete(@Param('id') id: string) {
    await this.scheduleShiftPatternService.deleteScheduleShiftPattern({
      id: parseInt(id),
    });
  }
}
