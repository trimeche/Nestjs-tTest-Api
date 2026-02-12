import { Controller, Post, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Controller('listusers') // This handles /api/listusers
export class UsersController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Post('seed') // This handles POST /api/listusers/seed
  async seed() {
    const newUser = this.usersRepository.create({ name: 'Database Test User' });
    return await this.usersRepository.save(newUser);
  }

  @Get()
  async findAll() {
    return await this.usersRepository.find();
  }
}
