import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ClientService } from '../services/client.service';
import { ClientsCardComponent } from './clients-card/clients-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../models/clients.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'buttons'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientService, private dialog: MatDialog, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<Client>();
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe(
      (clients: Client[]) => {
        this.dataSource = new MatTableDataSource(clients);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error loading clients:', error);
      }
    );
  }

  openDialog(client?: Client): void {
    const dialogRef = this.dialog.open(ClientsCardComponent, {
      data: client,
      height: '100vh',
      width: '30%',
      position: { right: '0' }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadClients();
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

  deleteClient(id: string): void {
    this.clientService.deleteClient(id).subscribe(
      (res: string) => {
        this.toastr.success(res, 'Delete Success');
        this.loadClients();
      },
      (error) => {
        console.error('Error deleting client:', error);
        this.toastr.error('Error deleting client', 'Delete Error');
      }
    );
  }
}
