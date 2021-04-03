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
import { EventEmitter2 } from '@nestjs/event-emitter';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('schedule')
@ApiTags('schedule')
export class ScheduleShiftPatternController {
  private readonly logger = new Logger(ScheduleShiftPatternController.name);
  constructor(
    private scheduleShiftPatternService: ScheduleShiftPatternService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Roles(Role.Boss)
  @ApiProperty({ type: ScheduleInputDto })
  @Post('create')
  async create(
    @Body() scheduleInput: ScheduleInputDto,
  ): Promise<ScheduleShiftPattern> {
    this.logger.log(scheduleInput, 'create');
    this.eventEmitter.emit(
      'fb.send',
      scheduleInput.guard_id,
      'Новое расписание',
      'На вас назначен новый объект. Проверьте приложение',
    );
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
    this.eventEmitter.emit(
      'fb.send',
      scheduleUpdateDto.guard_id,
      'Изменение в расписании',
      'В вашем расписании появлись изменения',
    );
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
    const r = await this.scheduleShiftPatternService.deleteScheduleShiftPattern(
      {
        id: parseInt(id),
      },
    );

    this.eventEmitter.emit(
      'fb.send',
      r.user_id,
      'Изменение в расписании',
      'Объект из вашего расписания был удален',
    );
  }
}
