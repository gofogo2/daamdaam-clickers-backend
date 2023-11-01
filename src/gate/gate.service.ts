import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGateDto, UpdateGateDto } from './dtos/GateDto';
import { Gate } from './entities/gate.entity';

@Injectable()
export class GateService {
  constructor(
    @InjectRepository(Gate) private gateRepository: Repository<Gate>,
  ) {}

  create(createGateDto: CreateGateDto) {
    this.gateRepository.save(createGateDto);
  }

  async modify(updateGateDto: UpdateGateDto) {
    const day = this.getTime();
    const item = await this.gateRepository.findOneBy({ day });
    console.log(item);
    this.gateRepository.update(
      { id: item.id },
      {
        count:
          item.count + updateGateDto.count < 0
            ? 0
            : item.count + updateGateDto.count,
        sum:
          updateGateDto.count > 0 ? item.sum + updateGateDto.count : item.sum,
      },
    );
  }

  async modifyTotal(updateGateDto: UpdateGateDto) {
    const day = this.getTime();
    const item = await this.gateRepository.findOneBy({ day });
    console.log(item);
    this.gateRepository.update(
      { id: item.id },
      {
        sum:
          updateGateDto.count > 0 ? item.sum + updateGateDto.count : item.sum,
      },
    );
  }

  findAll(): Promise<Gate[]> {
    return this.gateRepository.find({ order: { day: 'ASC' } });
  }

  async findDay(): Promise<Gate> {
    const day = this.getTime();
    const item = await this.gateRepository.findOneBy({ day });
    return item;
  }

  findOne(num: number): Promise<Gate> {
    return this.gateRepository.findOneBy({ id: 0 });
  }

  getTime(): number {
    const curr = new Date();
    console.log(curr.getDate());
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000; //한국 시간(KST)은 UTC시간보다 9시간 더 빠르므로 9시간을 밀리초 단위로 변환.
    const kr_curr = new Date(utc + KR_TIME_DIFF); //UTC 시간을 한국 시간으로 변환하기 위해 utc 밀리초 값에 9시간을 더함.
    console.log(kr_curr.getDate());
    return kr_curr.getDate();
  }
}
