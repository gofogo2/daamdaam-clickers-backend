import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private gateService: UserService) {}

  @Get('/:id/:password')
  async findOne(
    @Param('id') id: string,
    @Param('password') password: string,
    @Res() res: Response,
  ) {
    console.log(id);
    console.log(password);

    let isLogin = false;

    if (id === 'admin' && password === 'admin') {
      isLogin = true;
    }

    return res.status(HttpStatus.OK).json(isLogin);
  }
}
