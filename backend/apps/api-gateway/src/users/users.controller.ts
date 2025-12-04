import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get(':email')
  find(@Param('email') email: string) {
    return this.users.findByEmail(email);
  }
}
