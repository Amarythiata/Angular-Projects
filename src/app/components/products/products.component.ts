import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Observable, of} from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators/';
import { ActionEvent, AppDataStage, DataStateEnum, ProductActionsTypes } from './state/state';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$ : Observable<AppDataStage<Product[]>>;
  readonly dataStateEnum = DataStateEnum;

  constructor( private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    //this.OnGetAllProducts();
  }

  OnGetAllProducts(){
    this.products$ = this.productService.getAllProducts().pipe(
      map((data) => {
        console.log(data)
        return ({ dataState: DataStateEnum.LOADED, data: data })}),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err =>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  OnGetSeclectedProducts(){
    this.products$ = this.productService.getSelectedProducts().pipe(
      map((data) => {
        return ({ dataState: DataStateEnum.LOADED, data: data })}),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err =>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  OnGetAvailableProducts(){
    this.products$ = this.productService.getAvailableProducts().pipe(
      map((data) => {
        return ({ dataState: DataStateEnum.LOADED, data: data })}),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err =>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  OnSearchProducts(dataForm : any){
    this.products$ = this.productService.searchProducts(dataForm.keyword).pipe(
      map((data) => {
        return ({ dataState: DataStateEnum.LOADED, data: data })}),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err =>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }
  onSelect(p: Product){
    this.productService.selectProduct(p).subscribe(data => {
      p.selected = data.selected;
    })

  }

  onDeleteProduct(p: Product){
    let v = confirm("Etes vous sur de vouloir supprimer ?");
    if(v){
      this.productService.deleteProduct(p).subscribe(data => {
        this.OnGetAllProducts();
      })
    }
  }

  OnAddNewProduct(){
    this.router.navigateByUrl("/newProduct");
  }

  OnEditProduct(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);

  }

  onActionEvent($event: ActionEvent){

   switch($event.type){
     case ProductActionsTypes.GET_ALL_PRODUCTS : this.OnGetAllProducts(); break;
     case ProductActionsTypes.GET_SELECTED_PRODUCTS : this.OnGetSeclectedProducts(); break;
     case ProductActionsTypes.GET_AVAILABLE_PRODUCTS : this.OnGetAvailableProducts(); break;
     case ProductActionsTypes.SEARCH_PRODUCTS : this.OnSearchProducts($event.payload); break;
     case ProductActionsTypes.NEW_PRODUCTS : this.OnAddNewProduct(); break;
     case ProductActionsTypes.SELECT_PRODUCTS: this.onSelect($event.payload); break;
     case ProductActionsTypes.DELETE_PRODUCTS : this.onDeleteProduct($event.payload); break;
     case ProductActionsTypes.EDIT_PRODUCTS : this.OnEditProduct($event.payload); break;


     

   }
  }

}
