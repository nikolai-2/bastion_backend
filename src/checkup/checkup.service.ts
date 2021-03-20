import { ForbiddenException, Injectable } from '@nestjs/common';
import { ShiftZone, User } from '@prisma/client';
import { ScheduleShiftPatternService } from '../schedule-shift-pattern/schedule-shift-pattern.service';
import { ScheduleShiftPatternExtendType } from '../schedule-shift-pattern/schedule-shift-pattern-extend.type';
import { CheckedInputDto } from './dto/checked-input.dto';
import { ShiftZoneExtendType } from '../shift-zone/shift-zone-extend.type';
import { ShiftZoneService } from '../shift-zone/shift-zone.service';
import { AddCommentDto } from './add-comment.dto';

@Injectable()
export class CheckupService {
  constructor(
    private scheduleShiftPatternService: ScheduleShiftPatternService,
    private shiftZoneService: ShiftZoneService,
  ) {}

  async getList(
    user: User,
    date: string,
  ): Promise<ScheduleShiftPatternExtendType[]> {
    const currentDate = new Date(date);
    currentDate.setUTCHours(0, 0, 0, 0);

    const scheduleShiftPatterns = await this.scheduleShiftPatternService.scheduleShiftPatterns(
      {
        where: {
          user_id: user.id,
        },
        include: {
          ShiftZone: true,
          Place: {
            include: {
              Zone: true,
            },
          },
        },
      },
    );

    let checkupsItems: ScheduleShiftPatternExtendType[] = [];

    for (const scheduleShiftPattern of scheduleShiftPatterns) {
      let repeatWhen = <number[]>scheduleShiftPattern.repeat_when;

      const scheduleDate = new Date(scheduleShiftPattern.date.getTime());
      scheduleDate.setUTCHours(0, 0, 0, 0);

      if (repeatWhen.length < 1) {
        if (currentDate.getTime() === scheduleDate.getTime()) {
          checkupsItems.push(scheduleShiftPattern);
          continue;
        }
      }

      repeatWhen.forEach((value) => {
        if (currentDate.getTime() >= scheduleDate.getTime())
          if (currentDate.getDay() === value)
            checkupsItems.push(scheduleShiftPattern);
      });
    }

    return checkupsItems;
  }

  async checked(
    checkedInputDto: CheckedInputDto,
  ): Promise<ShiftZoneExtendType> {
    const scheduleShiftPattern = await this.scheduleShiftPatternService.scheduleShiftPattern(
      {
        where: {
          id: checkedInputDto.schedule_shift_id,
        },
        include: {
          Place: {
            include: {
              Zone: {
                where: {
                  id: checkedInputDto.zone_id,
                },
              },
            },
          },
        },
      },
    );

    if (scheduleShiftPattern.Place.Zone.length < 1)
      throw new ForbiddenException();

    return this.shiftZoneService.createShiftZone({
      comment: '',
      ScheduleShiftPattern: {
        connect: {
          id: checkedInputDto.schedule_shift_id,
        },
      },
      Zone: {
        connect: {
          id: checkedInputDto.zone_id,
        },
      },
    });
  }

  async addComment(addCommentDto: AddCommentDto): Promise<ShiftZone> {
    return this.shiftZoneService.updateShiftZone({
      where: {
        id: addCommentDto.shift_zone_record_id,
      },
      data: {
        comment: addCommentDto.comment,
      },
    });
  }
}
