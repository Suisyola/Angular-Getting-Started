import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product-service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService ) { }

  ngOnInit() {
    // Get the id param from URL. + is a Javascript shortcut for converting string to numeric.
    let id = +this.route.snapshot.paramMap.get('id');

    this.pageTitle += `: ${id}`;

    this.productService.getProduct(id).subscribe(
      product => {
        this.product = product;
      }
    );
  }

  onBack(): void {
    // Use the navigate() to route to a particular route
    this.router.navigate(['/products']);
  }
}
