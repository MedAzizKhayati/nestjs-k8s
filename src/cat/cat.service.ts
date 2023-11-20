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

  private getRandomString(minLength: number, maxLength: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    const length =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  async findRandom(): Promise<CatDocument> {
    const createCatDto = new CreateCatDto();
    createCatDto.name = this.getRandomString(3, 10);
    createCatDto.age = Math.floor(Math.random() * 20);
    createCatDto.breed = this.getRandomString(3, 10);
    await this.create(createCatDto);
    return (await this.catModel.aggregate([{ $sample: { size: 1 } }])).at(0);
  }

  async findRandoms(length: string): Promise<CatDocument[]> {
    const randoms = [];

    for (let i = 0; i < Math.min(parseInt(length), 50); i++) {
      randoms.push(await this.findRandom());
    }

    return randoms;
  }
}
