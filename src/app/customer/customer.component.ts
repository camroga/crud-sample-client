import { Component , OnInit, ViewChild, Injectable, Inject } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { CustomerInterface } from './customer';
import { Customer } from './customer.service';

const ELEMENT_DATA: Customer[] = [
  {firstName: "Emmie", surname: "Jones", streetAddress: "82 Grey Street", dob: "LANTATIONS 6701"},
  {firstName: "Kenneth", surname: "White", streetAddress: "67 Passage Avenue", dob: "THURSDAY ISLAND 4875"},
  {firstName: "Jim", surname: "Evans", streetAddress: "98 Daly Terrace", dob: "CARABOODA 6033"},
  {firstName: "Robert", surname: "Rodriguez", streetAddress: "97 Bresnahans Lane", dob: "FITZROY FALLS 2577"},
  {firstName: "Kathy", surname: "Ellington", streetAddress: "20 Fergusson Streete", dob: "COOLANESS 2470"},
];

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  private customer : CustomerInterface;
  private customers : Customer[];
	private displayedColumns: string[] = ['firstName','surname', 'streetAddress', 'dob'];
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
        this.dataSource.data = ELEMENT_DATA;
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngOnInit() {
    this.getCustomers();
  }

}
