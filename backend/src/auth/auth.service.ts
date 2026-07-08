import {
  Injectable,
  ConflictException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
  ) {}


  async register(dto: RegisterDto) {

    const existingUser =
      await this.usersService.findByEmail(dto.email);


    if(existingUser){
      throw new ConflictException(
        'Email already registered',
      );
    }


    const passwordHash =
      await bcrypt.hash(dto.password, 10);


    const user =
      await this.usersService.create({
        name: dto.name,
        email: dto.email,
        passwordHash,
      });


    return {
      message: 'Registration successful',
      user:{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
        status:user.status,
      }
    };
  }
}