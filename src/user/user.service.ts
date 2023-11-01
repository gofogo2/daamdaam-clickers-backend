import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private gateRepository: Repository<User>,
  ) {}

  async findOne(userId: string, password: string): Promise<User> {
    return await this.gateRepository.findOneBy({ userId, password });
  }
}
