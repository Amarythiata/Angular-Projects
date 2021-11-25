import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Product} from '../../../model/product.model'
import { EventDrivenService } from '../state/event-driven.service';
import { ActionEvent, ProductActionsTypes } from '../state/state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.scss']
})
export class ProductsNavBarComponent implements OnInit {

  product: Product;
 // @Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();

  constructor(private eventDrivenService: EventDrivenService) { }

  ngOnInit(): void {
  }

  OnGetAllProducts(){
  //this.productEventEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS});
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.GET_ALL_PRODUCTS})
  }

  OnGetSeclectedProducts(){
   // this.productEventEmitter.emit({type: ProductActionsTypes.GET_SELECTED_PRODUCTS});
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.GET_SELECTED_PRODUCTS})


  }

  OnGetAvailableProducts(){
    // this.productEventEmitter.emit({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS})

    

  }

  OnAddNewProduct(){
    //this.productEventEmitter.emit({type: ProductActionsTypes.NEW_PRODUCTS});
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.NEW_PRODUCTS})


  }

  OnSearchProducts(dataForm: any){
   // this.productEventEmitter.emit({type: ProductActionsTypes.SEARCH_PRODUCTS, payload: dataForm});
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.SEARCH_PRODUCTS, payload: dataForm})


  }
}
