import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, ProductActionsTypes } from '../../state/state';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent implements OnInit {

  @Input() productInput: Product;
  @Output() itemEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: Product){
    this.itemEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCTS, payload:p})
  }  

  onDeleteProduct(p: Product){
    this.itemEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCTS, payload:p})

  }

  OnEditProduct(p: Product){
    this.itemEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCTS, payload:p})

  }


}
