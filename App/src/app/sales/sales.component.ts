import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { SaleService } from '../services/sale.service';

import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Sale } from '../models/sales.model';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  displayedColumns: string[] = ['clientId', 'saleDate', 'totalPrice'];
  dataSource: MatTableDataSource<Sale>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private saleService: SaleService, private dialog: MatDialog, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<Sale>();
  }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.saleService.getAllSales().subscribe(
      (sales: Sale[]) => {
        this.dataSource = new MatTableDataSource(sales);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error loading sales:', error);
      }
    );
  }

  openDialog(sale?: Sale): void {
    const dialogRef = this.dialog.open(SalesComponent, {
      data: sale,
      height: '80vh',
      width: '50%',
      position: { top: '5%' },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadSales();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSale(id: string): void {
    this.saleService.deleteSale(id).subscribe(
      (res: string) => {
        this.toastr.success(res, 'Delete Success');
        this.loadSales();
      },
      (error) => {
        console.error('Error deleting sale:', error);
        this.toastr.error('Error deleting sale', 'Delete Error');
      }
    );
  }
}
