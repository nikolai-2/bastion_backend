import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CheckupService } from './checkup.service';
import { CheckupItemDto } from './dto/checkup-item.dto';
import { CheckedInputDto } from './dto/checked-input.dto';
import { ShiftZoneExtendType } from '../shift-zone/shift-zone-extend.type';
import { AddCommentDto } from './add-comment.dto';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('checkup')
@ApiTags("checkup")
export class CheckupController {
  constructor(private checkupService: CheckupService) {}

  @Get(':date/getList')
  @ApiResponse({description:"EXAMPLE: https://pastebin.com/vkwwUwDJ"})
  async getList(
    @Request() req,
    @Param('date') date: string,
  ): Promise<CheckupItemDto[]> {
    return await this.checkupService.getList(req.user, date);
  }

  @Post('checked')
  @ApiProperty({type:CheckedInputDto})
  async checked(
    @Request() req,
    @Body() checkedInputDto: CheckedInputDto,
  ): Promise<ShiftZoneExtendType> {
    return this.checkupService.checked(checkedInputDto);
  }

  @Post('addComment')
  @ApiProperty({type:AddCommentDto})
  async addComment(
    @Request() req,
    @Body() addCommentDto: AddCommentDto,
  ): Promise<ShiftZoneExtendType> {
    return this.checkupService.addComment(addCommentDto);
  }
}
