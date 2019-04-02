import { Component, OnInit  } from '@angular/core';
import {Router} from "@angular/router";
import {MyServiceService } from '../../services/my-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees = [];

  constructor( private myService:MyServiceService,private router :Router) { }

  ngOnInit() {
    this.loadAllEmployees();
  }

  public loadAllEmployees(){
    this.myService.getEmployee().subscribe(res=>this.employees=res);
  }

  public onEmpEdit(id){
    this.router.navigate(['/editemployee',id]);
  
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
