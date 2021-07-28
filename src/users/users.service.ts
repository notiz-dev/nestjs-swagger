import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto): User {
    return null;
  }

  findAll(): User[] {
    return null;
  }

  findOne(id: number): User {
    return null;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    return null;
  }

  remove(id: number): User {
    return null;
  }
}
