import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

// @Injectable({
//   providedIn: 'root'
// })

@Component({
  selector: 'app-user-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss']
})
export class ProductsCardComponent implements OnInit{
  user: User;
  userForm: FormGroup;
  // roleOptions: {key: string, value: number}[] = [];
  roleOptions: string[] = [];
  numbers: number[] = [];
  constructor(
    public dialogRef: MatDialogRef<ProductsCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ){
    this.user = data;
    console.log(this.user,'<--- card')
    this.userForm = this.fb.group({
      name: [this.user?.name, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      password: [this.user?.password, this.user==undefined?Validators.required:''],
      phoneNumber: [this.user?.phoneNumber, Validators.required],
    });
  }

  ngOnInit(): void {
    
    // this.numbers.map(n => this.roleOptions[n] = {key: this.roleOptions[n].key, value: n})
  }

  onSubmit(){
    if(this.user == undefined){
      console.log(this.userForm.value);
      this.userService.createUser(this.userForm.value).subscribe(
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
          console.error('Error creating user:', error);
          this.toastr.error('Error creating user', 'Create Error');
        }
      );
      // this.userService.createUser(user.value).
    }else{
      
      this.user.name = this.userForm.value.name;
      this.user.email = this.userForm.value.email;
      this.user.phoneNumber = this.userForm.value.phoneNumber;
      console.log(this.user)
      this.userService.updateUser(this.user.id, this.user).subscribe(
        (res: string) => {
          this.toastr.success(res, 'Update Success');
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error updating user:', error);
          this.toastr.error('Error updating user', 'Update Error');
        }
      );
    }
  }
}
