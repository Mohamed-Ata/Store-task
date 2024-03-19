import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = 'https://fakestoreapi.com';
  // apiUrl = 'https://dev.api.fsc.is.sa/api'

  constructor(
    private _httpClient: HttpClient
  ) { }

  // search for requests
  getAllProducts(limit?:number) {
    return this._httpClient.get(`${ this.apiUrl }/products${limit ? '?limit=' + limit : ''}`)
  }

  getProductById(prodId:string) {
    return this._httpClient.get(`${ this.apiUrl }/products/${prodId}`)
  }

  getCategories(){
    return this._httpClient.get(`${ this.apiUrl }/products/categories`)
  }

  createNew(data:any){
    return this._httpClient.post(`${ this.apiUrl }/products`, data)
  }
  

  updateProduct(prodId: number,data:any){
    return this._httpClient.put(`${ this.apiUrl }/products/${prodId}`, data)
  }

  deleteProduct(prodId:number){
    return this._httpClient.delete(`${ this.apiUrl }/products/${prodId}`)
  }
}
