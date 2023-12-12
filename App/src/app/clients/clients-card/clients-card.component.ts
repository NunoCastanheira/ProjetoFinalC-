import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { ClientService } from '../../services/client.service';
import { Client } from '../../models/clients.model';

@Component({
  selector: 'app-clients-card',
  templateUrl: './clients-card.component.html',
  styleUrls: ['./clients-card.component.scss']
})
export class ClientsCardComponent implements OnInit {
  client: Client;
  clientForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ClientsCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private fb: FormBuilder,
    private clientService: ClientService,
    private toastr: ToastrService
  ) {
    this.client = data;
    this.clientForm = this.fb.group({
      firstName: [this.client?.firstName, Validators.required],
      lastName: [this.client?.lastName, Validators.required],
      email: [this.client?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.client?.phoneNumber, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.client === undefined) {
      this.clientService.createClient(this.clientForm.value).subscribe(
        (res: string) => {
          if (res.startsWith('Error')) {
            this.toastr.error(res, 'Create Error');
          } else {
            this.toastr.success(res, 'Create Success');
            this.dialogRef.close();
          }
        },
        (error) => {
          console.error('Error creating client:', error);
          this.toastr.error('Error creating client', 'Create Error');
        }
      );
    } else {
      this.client.firstName = this.clientForm.value.firstName;
      this.client.lastName = this.clientForm.value.lastName;
      this.client.email = this.clientForm.value.email;
      this.client.phoneNumber = this.clientForm.value.phoneNumber;

      this.clientService.updateClient(this.client.id, this.client).subscribe(
        (res: string) => {
          this.toastr.success(res, 'Update Success');
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error updating client:', error);
          this.toastr.error('Error updating client', 'Update Error');
        }
      );
    }
  }
}
