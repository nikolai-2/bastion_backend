import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Body,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CheckupService } from './checkup.service';
import { CheckupItemDto } from './dto/checkup-item.dto';
import { CheckedInputDto } from './dto/checked-input.dto';
import { ShiftZoneExtendType } from '../shift-zone/shift-zone-extend.type';
import { AddCommentDto } from './add-comment.dto';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/roles.enum';
import { RolesGuard } from 'src/role/roles.guard';
import { inspect } from 'util';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('checkup')
@ApiTags('checkup')
export class CheckupController {
  private readonly logger = new Logger(CheckupController.name)
  constructor(private checkupService: CheckupService) {}

  @Roles(Role.Guard)
  @Get(':date/getList')
  @ApiResponse({ description: 'EXAMPLE: https://pastebin.com/vkwwUwDJ' })
  async getList(
    @Request() req,
    @Param('date') date: string,
  ): Promise<CheckupItemDto[]> {
    this.logger.log([req.user,date],'getList')
    return await this.checkupService.getList(req.user, date);
  }

  @Roles(Role.Guard)
  @Post('checked')
  @ApiProperty({ type: CheckedInputDto })
  async checked(
    @Request() req,
    @Body() checkedInputDto: CheckedInputDto,
  ): Promise<ShiftZoneExtendType> {
    this.logger.log(checkedInputDto,'checked')
    return this.checkupService.checked(checkedInputDto);
  }

  @Roles(Role.Guard)
  @Post('addComment')
  @ApiProperty({ type: AddCommentDto })
  async addComment(
    @Request() req,
    @Body() addCommentDto: AddCommentDto,
  ): Promise<ShiftZoneExtendType> {
    this.logger.log(addCommentDto,'addComment')
    return this.checkupService.addComment(addCommentDto);
  }
}
