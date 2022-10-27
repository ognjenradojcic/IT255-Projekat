import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], search: string): Product[] {
    if (!products) return [];
    if (!search) return products;
    search = search.toLowerCase();
    let arr = products.filter(product => product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search));
    return arr;
  }

}