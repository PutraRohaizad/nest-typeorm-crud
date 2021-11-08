import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private categoryRespository : Repository<Category>){}

  findAll() : Promise<Category[]> {
    return this.categoryRespository.find();
  }

  findOne(id: number) : Promise<Category> {
    try{
      return this.categoryRespository.findOneOrFail(id);
    }
    catch(err){
      throw err;
    }
  }

  create(createCategoryDto: CreateCategoryDto) {
    const newUser = this.categoryRespository.create(createCategoryDto);
    return this.categoryRespository.save(newUser);
  }

  // async update(id: number, updateCategoryDto: UpdateCategoryDto) : Promise<Category> {
  //   let user = await this.findOne(id);
  //   user.name = updateCategoryDto.name;
  //   user.age = updateCategoryDto.age;

  //   return this.categoryRespository.save(user);
  // }

  // async remove(id: number) : Promise<Category> {
  //   let user = await this.findOne(id);
  //   return this.categoryRespository.remove(user);
  // }
}
