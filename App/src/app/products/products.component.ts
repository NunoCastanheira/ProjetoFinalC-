import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from '../models/products.model';
import { ProductService } from '../services/product.service';
import { ProductsCardComponent } from './products-card/products-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'quantity', 'buttons'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService,private  dialog: MatDialog, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }
  openDialog(user?: Product){
    const dialogRef = this.dialog.open(ProductsCardComponent, {
      data: user,
      height: '100vh',
      width: '30%',
      position: { right: '0'}
    });
    dialogRef.afterClosed().subscribe(pc => {
      this.loadProducts();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(
      (res: string) => {
        this.toastr.success(res, 'Delete Success');
        this.loadProducts();
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.toastr.error('Error deleting user', 'Delete Error');
      }
    );
    }
}
