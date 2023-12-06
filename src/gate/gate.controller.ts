import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateGateDto, UpdateGateDto } from './dtos/GateDto';
import { GateService } from './gate.service';

@Controller('gate')
export class GateController {
  constructor(private gateService: GateService) {}

  // 전체리스트+토탈합
  @Get('')
  @ApiTags('ALL VISITOR')
  async find(@Res() res: Response) {
    const gates = await this.gateService.findAll();
    return res.status(HttpStatus.OK).json([...gates]);
  }

  //오늘 게이트 조회
  @Get('delete')
  @ApiTags('DELETE VISITOR')
  async delete(@Res() res: Response) {
    console.log('aaaaaaaaaaaaaa');
    const item = await this.gateService.clearToday();
    return res.status(HttpStatus.OK).json(item);
  }

  //토탈
  @Get('total')
  @ApiTags('TOTAL VISITOR')
  async getTotal(@Res() res: Response) {
    const gates = await this.gateService.findAll();
    let all = 0;
    gates.forEach((a) => (all += a.sum));
    return res.status(HttpStatus.OK).json(all);
  }

  //오늘 게이트 조회
  @Get('day')
  @ApiTags('TODAY VISITOR')
  async findOne(@Res() res: Response) {
    const item = await this.gateService.findDay();
    return res.status(HttpStatus.OK).json(item);
  }

  // count ++
  @Post()
  @ApiTags('+/- VISITOR')
  @ApiCreatedResponse({
    type: UpdateGateDto,
  })
  update(@Body() updateGateDto: UpdateGateDto, @Res() res: Response) {
    this.gateService.modify(updateGateDto);
    return res.status(HttpStatus.OK).send();
  }

  // count ++
  @Post('total')
  @ApiTags('+/- VISITOR Total')
  @ApiCreatedResponse({
    type: UpdateGateDto,
  })
  updateTotal(@Body() updateGateDto: UpdateGateDto, @Res() res: Response) {
    this.gateService.modifyTotal(updateGateDto);
    return res.status(HttpStatus.OK).send();
  }

  @Get('admin')
  @ApiTags('admin')
  async findAdmin(@Res() res: Response) {
    const day = await (await this.gateService.findDay()).sum;
    const gates = await this.gateService.findAll();
    let all = 0;
    gates.forEach((a) => (all += a.sum));

    return res.status(HttpStatus.OK).json({ day, all });
  }

  //게이트등록
  @Post('add')
  @ApiCreatedResponse({
    type: CreateGateDto,
  })
  create(@Body() createGateDto: CreateGateDto, @Res() res: Response) {
    this.gateService.create(createGateDto);
    return res.status(HttpStatus.OK).send();
  }
}
