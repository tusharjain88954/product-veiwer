import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  private _listFilter = '';
  errorMessage: any;
  sub: any;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  constructor(private productService: ProductService) {}
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    );
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  ngOnInit(): void {
    this.listFilter = 'cart';
    // this.products = this.productService.getProducts();
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
