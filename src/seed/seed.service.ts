import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { Product } from '../products/entities';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async runSeed() {
    await this.insertNewProducts();
    return 'Runing Seed';
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts();
    const products = initialData.products;
    const insertPromise = [];
    products.forEach((product) => {
      insertPromise.push(this.productService.create(product));
    });
    Promise.all(insertPromise);
    return true;
  }
}
