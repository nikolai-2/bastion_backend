import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ScheduleShiftPatternService } from '../schedule-shift-pattern/schedule-shift-pattern.service';
import { ScheduleShiftPatternExtendType } from '../schedule-shift-pattern/schedule-shift-pattern-extend.type';

@Injectable()
export class CheckupService {
  constructor(
    private scheduleShiftPatternService: ScheduleShiftPatternService,
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
}
