import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sale } from '../../models/sales.model';


@Component({
  selector: 'app-sale-card',
  templateUrl: './sales-card.component.html',
  styleUrls: ['./sales-card.component.scss']
})
export class SaleCardComponent {
  sale: Sale;
  saleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SaleCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sale,
    private fb: FormBuilder
  ) {
    this.sale = data;
    this.saleForm = this.fb.group({
      clientId: [this.sale?.clientId, Validators.required],
      saleDate: [this.sale?.saleDate, Validators.required],
    });
  }

  onSubmit() {
    this.dialogRef.close(this.saleForm.value);
  }
}
