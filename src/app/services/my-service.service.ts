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
    console.log("GET API call");
    return this.http.get<any>('http://localhost:5000/employees');
  }

  public createEmployee(employee) {
    console.log("Create API call");
    console.log(employee);
   // return this.http.post<any>("http://localhost:5000/employees", employee);
    return this.http.post<any>("http://localhost:5000/employees",employee, httpOptions);
  }

  public deleteEmployee(employee) {
    return this.http.delete<any>("http://localhost:5000/employees" + "/"+ employee.empId);
    //return this.http.delete<Employee>("http://localhost:5555/employees" + "/"+ employee.empId);
  }

}
