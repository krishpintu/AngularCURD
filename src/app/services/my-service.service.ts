import { Injectable } from '@angular/core';

import { HttpClient , HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http :HttpClient) { 
  }

  public getEmployee(){
    console.log("getEmployee API call");
    return this.http.get<any>('http://localhost:5000/employees');
  }
  public getEmployeeById(empId){
    console.log("getEmployeeById API call");
    return this.http.get<any>('http://localhost:5000/employees'+'/'+empId);
  }

  public createEmployee(employee) {
    console.log("createEmployee API call");
    return this.http.post<any>("http://localhost:5000/employees",employee, httpOptions);
  }

  public updateEmployee(employee){
    console.log("updateEmployee API call");
    return this.http.put<any>("http://localhost:5000/employees"+"/"+employee.id,employee,httpOptions);
  }

  public deleteEmployee(employee) {
    console.log("deleteEmployee API call");
    return this.http.delete<any>("http://localhost:5000/employees"+"/"+ employee.id);
    //return this.http.delete<Employee>("http://localhost:5555/employees" + "/"+ employee.empId);
  }

}
