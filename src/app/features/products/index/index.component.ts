import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit, OnDestroy {
  _unsubscribeAll = new Subject<any>();

  products: Product[] = [];

  productsByGroup: any
  constructor(
    private _productsService: ProductsService
  ){ }

  ngOnInit(): void {
    this.getProducts();
    
  }

  getProducts(){
    this._productsService.getAllProducts().pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe({
      next: (res: any) => {
        this.products = res;

        const category = this.products.reduce((acc: any, curr) => {
          let key = curr.category;
          if (!acc[key!]) {
            acc[key!] = [];
          }
          acc[key!].push(curr);
          return acc;
        }, {});
    
        //Get the groups and tasks related.
        this.productsByGroup = Object.keys(category).map(key => ({
          category: key,
          products: category[key]
        }));
      },
      error: (err) => {
        // this._helperService.handleError(err);
      }
    })
  }

  // getProducts(){
  //   this._productsService.getAllProducts().pipe(
  //     takeUntil(this._unsubscribeAll)
  //   ).subscribe({
  //     next: (res: any) => {
  //       this.products = res;

  //       const category = this.products.reduce((acc: any, curr) => {
  //         let key = curr.category;
  //         if (!acc[key!]) {
  //           acc[key!] = [];
  //         }
  //         acc[key!].push(curr);
  //         return acc;
  //       }, {});
    
  //       //Get the groups and tasks related.
  //       this.productsByGroup = Object.keys(category).map(key => ({
  //         category: key,
  //         products: category[key]
  //       }));

  //       console.log(this.productsByGroup)

  //     },
  //     error: (err) => {
  //       // this._helperService.handleError(err);
  //     }
  //   })
  // }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
  }
}

