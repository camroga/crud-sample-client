import { Component , OnInit, ViewChild, Injectable, Inject } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { CustomerInterface } from './customer';
import { Customer } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  private customer : CustomerInterface;
  private customers : Customer[];
	private displayedColumns: string[] = ['firstName','surname', 'streetAddress', 'DOB'];
  private dataSource = new MatTableDataSource<Customer>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(@Inject('CustomerInterface') customer: CustomerInterface) {
    this.customer = customer;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCustomers() {
    this.customer.getCustomers().subscribe(
      data => {
        console.info(data);
        this.customers = data;
        this.dataSource.data = this.customers;
        this.dataSource.sort = this.sort;
      }, 
      err => {
        this.dataSource = new MatTableDataSource([]);
      }
    );
  }

  ngOnInit() {
    this.getCustomers();
  }

}
