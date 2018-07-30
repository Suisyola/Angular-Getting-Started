import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

import { ProductService } from './product-service';

//@Component is a function, hence(), which takes in an object, hence {}
@Component({
  selector: 'pm-products',
  // ./ is used because the html is on the same directory as this file
  templateUrl: './product-list.component.html',
  // apply styles only to this component. Takes in array. Can add more styles using commas.
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageHeight: number = 2;
  showImage: boolean = false;
  errorMessage: string;

  _listFilter: string;


  // when data binding needs value, will invoke getter
  get listFilter(): string {
    return this._listFilter;
  }
  // when user changes input, data binding invoke setter
  set listFilter(value: string) {
    this._listFilter = value;
    // this.listFilter ? checks for string that is empty, null or undefined
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  // array of any data type. Any refers to we don't know or don't care what the specific data type is
  products: IProduct[] = [];

  constructor(private productService: ProductService) {
  }

  // This is a method that returns void
  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  // On Init Lifecycle Hook
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
    
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  // method to perform filtering of IProduct that has string in filter
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
