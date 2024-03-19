import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../core/models/product.model';
import { ProductsService } from '../../../shared/services/products.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit, OnDestroy{
  _unsubscribeAll = new Subject<any>();
  productForm!: FormGroup;
  categories: any;
  isEdit: boolean = false;
  formSubmitted: boolean = false;


  currentProduct!: Product;
  currentProductId!: string;


  constructor(
    private _productsService: ProductsService,
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.initProductForm();
    this.getCategoryList();

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
          this.productForm.patchValue(res);
          this.isEdit = true
        },
        error: (err) => {
          // this._helperService.handleError(err);
        },
      });
  }

  initProductForm(){
    this.productForm = this._fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required],
      category: [null, Validators.required],
    })
  }


  getCategoryList(){
    this._productsService.getCategories().pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err) => {
        // this._helperService.handleError(err);
      }
    })
  }

  submitForm(){
    this.formSubmitted = true;
    if(this.isEdit){
      if(this.productForm.valid){
        this._productsService.updateProduct(Number(this.currentProductId), this.productForm.value).subscribe({
          next: (res) => {
            // this._helperService.handleSuccess(res);
            this._router.navigate(["/dashboard"]);
          },
          error: (e) => {
            // this._helperService.handleError(e)
          },
        });
      }
    } else {
      if(this.productForm.valid){
        this._productsService.createNew(this.productForm.value).subscribe({
          next: (res) => {
            // this._helperService.handleSuccess(res);
            this._router.navigate(["/dashboard"]);
          },
          error: (e) => {
            // this._helperService.handleError(e)
          },
        });
      }
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
  }
}
