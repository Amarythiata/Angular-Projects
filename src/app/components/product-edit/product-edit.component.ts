import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productId: number;
  productFormGroup: FormGroup;
  submitted: boolean =false;

  constructor( private fb: FormBuilder, private activatedRoute: ActivatedRoute, private productService: ProductsService, private router: Router) { 
    this.productId = activatedRoute.snapshot.params.id;
    console.log(this.productId);
  }

  ngOnInit(): void {
  this.productService.getProduct(this.productId).subscribe(product => {
    this.productFormGroup = this.fb.group({
      id:[product.id, Validators.required],
      name:[product.name, Validators.required],
      price:[product.price, Validators.required],
      quantity:[product.quantity, Validators.required],
      selected:[product.selected, Validators.required],
      available:[product.available, Validators.required]
      })

  })
}

onUpdateProduct(){
this.productService.updateProduct(this.productFormGroup.value).subscribe(data => {
  alert("Success Product Update");
  this.router.navigateByUrl("/products");

})
}

}
