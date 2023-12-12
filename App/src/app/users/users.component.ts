import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { UserCardComponent } from './user-card/user-card.component';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'email','phonenumber', 'buttons'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private userService: UserService, private  dialog: MatDialog, private toastr: ToastrService) {

    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit(){
    this.loadUsers();
  }

  loadUsers(): void{
    this.userService.getUsers().subscribe(  (res: User[])=> {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  openDialog(user?: User){
    const dialogRef = this.dialog.open(UserCardComponent, {
      data: user,
      height: '100vh',
      width: '30%',
      position: { right: '0'}
    });
    dialogRef.afterClosed().subscribe(ac => {
      this.loadUsers();
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

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      (res: string) => {
        this.toastr.success(res, 'Delete Success');
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.toastr.error('Error deleting user', 'Delete Error');
      }
    );
  }
}