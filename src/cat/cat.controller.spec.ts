import { Test } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { AppModule } from '../app.module';

describe('CatController', () => {
  let controller: CatController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<CatController>(CatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of cats', async () => {
    expect(await controller.findAll()).toBeInstanceOf(Array);
  });

  it('should create & find a cat', async () => {
    const cat = {
      name: 'test',
      age: 1,
      breed: 'test',
    };
    const createdCat = await controller.create(cat);
    expect(createdCat).toMatchObject(cat);
    expect(createdCat).toHaveProperty('id');
    expect((await controller.findOne(createdCat.id)).id).toEqual(createdCat.id);
  });

  it('should find a random cat', async () => {
    const cat = await controller.findRandom();
    expect(cat).toHaveProperty('_id');
    expect(cat).toHaveProperty('name');
    expect(cat).toHaveProperty('age');
    expect(cat).toHaveProperty('breed');
  });
  
});
