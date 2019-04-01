import { Component, OnInit } from '@angular/core';

import {MyServiceService } from '../../services/my-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees = [];
  constructor( private myService:MyServiceService) { }

  ngOnInit() {

    this.myService.getEmployee().subscribe(res=>this.employees=res);
  }

}
