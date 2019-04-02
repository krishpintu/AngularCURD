import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';

import { noWhitespaceValidator , ValidateUrl  } from '../../shared/app.validators'; //custom validator

import { MyServiceService } from '../../services/my-service.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  registerForm :FormGroup;
  submitted = false;
  states :object = [
    {name: 'Jharkhand', abbrev: 'JH'},
    {name: 'Bihar', abbrev: 'BR'},
    {name: 'Karnataka', abbrev: 'KR'}
  ];
  employeeIdUpdate = null;  

  buttonText='Register';

  constructor(private frmBuilder : FormBuilder , private myService:MyServiceService,private _router :ActivatedRoute ) { 

  }

  ngOnInit() {

  

    this.registerForm =this.frmBuilder.group(
      {
        fname: ['', [Validators.required,noWhitespaceValidator]],
        lname : ['',[Validators.required,noWhitespaceValidator]],
        email: ['', [Validators.required,Validators.email]],
        gender: ['', Validators.required],
        dob: ['', [Validators.required,Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]],
        add: ['', [Validators.required,noWhitespaceValidator]],
        state: ['',Validators.required],
        pin: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6)]],
        phn :['',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("^[0-9]*$")]],
        tc: ['', Validators.requiredTrue]
      }
    );

    this._router.paramMap.subscribe(params=>{
      const empId = params.get('id');
      if(empId){
        this.loadEmpData(empId);
      }
    });

  }

  //catch all controls
  get f() {
    return this.registerForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    //console.log('fname=' + this.f.fname.value);
    if(this.employeeIdUpdate==null){

      let empdata =this.registerForm.value;
      empdata["id"]=new Date().getTime();
      this.myService.createEmployee(empdata).subscribe( data => {
        alert("Employee created successfully.");
        this.registerForm.reset();  
        this.employeeIdUpdate = null;
      });

    }else{

      let empdata =this.registerForm.value;
      empdata["id"]=this.employeeIdUpdate;
      this.myService.updateEmployee(empdata).subscribe( data => {
        alert("Employee updated successfully.");
        this.registerForm.reset();  
        this.employeeIdUpdate = null;
      });

    }
    
  }

  public loadEmpData(empId){
    this.myService.getEmployeeById(empId).subscribe(employee=> {
      this.employeeIdUpdate = employee.id; 
      this.registerForm.patchValue({
          fname: employee.fname,
          lname : employee.lname,
          email: employee.email,
          gender: employee.gender,
          dob: employee.dob,
          add: employee.add,
          state: employee.state,
          pin: employee.pin,
          phn :employee.phn,
          tc: employee.tc
      });
      this.buttonText='Save Data';
  });
      
      

   
    
  }

}
