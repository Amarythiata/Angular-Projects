import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataStage, DataStateEnum, ProductActionsTypes } from '../state/state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$ : Observable<AppDataStage<Product[]>>;

  @Output() productsEventEmitter:EventEmitter<ActionEvent> = new EventEmitter();

  readonly dataStateEnum = DataStateEnum;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: Product){
    this.productsEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCTS, payload:p})
  }

  onDeleteProduct(p: Product){
    this.productsEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCTS, payload:p})

  }

  OnEditProduct(p: Product){
    this.productsEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCTS, payload:p})

  }
  onActionEvent($event: ActionEvent){
    this.productsEventEmitter.emit($event);

  }
}
