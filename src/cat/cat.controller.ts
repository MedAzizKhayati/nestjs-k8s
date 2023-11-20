import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  async findAll() {
    return this.catService.findAll();
  }

  @Get('random')
  async findRandom() {
    return this.catService.findRandom();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.catService.findOne(id);
  }

}
