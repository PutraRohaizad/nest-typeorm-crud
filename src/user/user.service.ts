import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRespository : Repository<User>){}

  findAll() : Promise<User[]> {
    return this.userRespository.find();
  }

  findOne(id: number) : Promise<User> {
    try{
      return this.userRespository.findOneOrFail(id);
    }
    catch(err){
      throw err;
    }
  }

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRespository.create(createUserDto);
    return this.userRespository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<User> {
    let user = await this.findOne(id);
    user.name = updateUserDto.name;
    user.age = updateUserDto.age;

    return this.userRespository.save(user);
  }

  async remove(id: number) : Promise<User> {
    let user = await this.findOne(id);
    return this.userRespository.remove(user);
  }
}
