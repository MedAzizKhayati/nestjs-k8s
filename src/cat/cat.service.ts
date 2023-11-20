import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<CatDocument> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<CatDocument[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<CatDocument> {
    return this.catModel.findById(id);
  }
}
