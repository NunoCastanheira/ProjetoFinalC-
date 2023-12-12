import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products.model';



@Component({
  selector: 'app-user-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss']
})
export class ProductsCardComponent implements OnInit{
  product: Product;
  productForm: FormGroup;
  roleOptions: string[] = [];
  numbers: number[] = [];
  constructor(
    public dialogRef: MatDialogRef<ProductsCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService
  ){
    this.product = data;
    this.productForm = this.fb.group({
      name: [this.product?.name, Validators.required],
      description: [this.product?.description, Validators.required],
      price: [this.product?.price, Validators.required],
      quantity: [this.product?.quantity, Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    if(this.product == undefined){
      console.log(this.productForm.value);
      this.productService.createProduct(this.productForm.value).subscribe(
        (res: string) => {
          if (res.startsWith('Error')) {
            console.error(res);
            this.toastr.error(res, 'Create Error');
          } else {
            this.toastr.success(res, 'Create Success');
            this.dialogRef.close();
          }
        },
        (error) => {
          console.error('Error creating product:', error);
          this.toastr.error('Error creating product', 'Create Error');
        }
      );
      // this.productService.createproduct(product.value).
    }else{
      
      this.product.name = this.productForm.value.name;
      this.product.description = this.productForm.value.description;
      this.product.price = this.productForm.value.price;
      this.product.quantity = this.productForm.value.quantity;
      console.log(this.product)
      this.productService.updateProduct(this.product.id, this.product).subscribe(
        (res: string) => {
          this.toastr.success(res, 'Update Success');
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error updating product:', error);
          this.toastr.error('Error updating product', 'Update Error');
        }
      );
    }
  }
}
