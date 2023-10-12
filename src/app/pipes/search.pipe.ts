import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interfaces/allproducts';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: product[], searchTerm: string): product[] {
    return products.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
