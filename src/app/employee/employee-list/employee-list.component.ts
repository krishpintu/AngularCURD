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

    this.loadAllEmployees();
  }

  public loadAllEmployees(){
    this.myService.getEmployee().subscribe(res=>this.employees=res);
  }

  public onEmpEdit(employee){
    console.log('edit');
  }
  public onEmpDelete(employee){
    
    this.myService.deleteEmployee(employee).subscribe(
      res => {
        alert('Employee deleted successfully.');
        this.loadAllEmployees();  
      }
    );
  }
}
