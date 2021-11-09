import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productFormGroup: FormGroup;
  submitted: boolean = false;

  constructor(private fb:FormBuilder, private productService: ProductsService) {}

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name:["", Validators.required],
      price:[0, Validators.required],
      quatity:[0, Validators.required],
      selected:[true, Validators.required],
      available:[true, Validators.required]
    })
  }


  onSaveProduct(){
    this.submitted = true;
    if(this.productFormGroup.invalid) return;
    this.productService.saveProduct(this.productFormGroup.value).subscribe(data => {
        alert("Success saving products");
    })
  }
}
