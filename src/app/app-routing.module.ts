import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {HomeComponent} from "./components/home/home.component";
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';



const routes: Routes = [
  {"path": "products", component: ProductsComponent},
  {"path": "newProduct", component: AddProductComponent},
  {"path": "editProduct/:id", component: ProductEditComponent},
  {"path": "", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
