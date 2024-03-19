import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ProductsService } from '../../../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../auth/models/user';
import { AuthService } from '../../auth/services/auth.service';
import { Role } from '../../auth/models/role';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  _unsubscribeAll = new Subject<any>();
  currentProduct!: Product;
  currentProductId!: string;

  currentUser!: User;
  userRole = Role
  constructor(
    private _productsService: ProductsService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ){ }

  ngOnInit(): void {
    this._authService.currentUser.subscribe( res => this.currentUser = res);

    this._activatedRoute.params
      .pipe(
        takeUntil(this._unsubscribeAll),
        switchMap((res) => {
          if (res["id"]) {
            this.currentProductId = res["id"];
            return this._productsService.getProductById(this.currentProductId);
          } else return [];
        })
      )
      .subscribe({
        next: (res: any) => {
          this.currentProduct = res ? res : {};
        },
        error: (err) => {
          // this._helperService.handleError(err);
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
  }
}


