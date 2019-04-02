import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';

import { noWhitespaceValidator , ValidateUrl  } from '../../shared/app.validators'; //custom validator

import { MyServiceService } from '../../services/my-service.service';

import { EventEmitterService } from '../../services/event-emitter.service'; 

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

  constructor(private frmBuilder : FormBuilder , private myService:MyServiceService ,private eventEmitterService:EventEmitterService) { 

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

    //implement for receive method call from another component using service
    
    if (this.eventEmitterService.subsVar==undefined) {    
        this.eventEmitterService.subsVar = this.eventEmitterService.invokeAddEmpFunction.subscribe((id) => {    
        this.loadEmpData(id); 
        this.registerForm.get("fname").patchValue('selected.id');
      })    
    }  
    
    //

  }

  //catch all controls
  get f() {
    return this.registerForm.controls;
  }

  /*noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }*/

  
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

  public loadEmpData(id){
    alert(id);
    this.myService.getEmployeeById(id).subscribe(employee=> {   
      this.employeeIdUpdate = employee.id; 
      
      this.registerForm.controls['fname'].setValue(employee.fname);  
      this.registerForm.controls['lname'].setValue(employee.lname);  
      this.registerForm.controls['email'].setValue(employee.email);  
      this.registerForm.controls['gender'].setValue(employee.gender);  
      this.registerForm.controls['dob'].setValue(employee.dob);  
      this.registerForm.controls['add'].setValue(employee.add);  
      this.registerForm.controls['state'].setValue(employee.state);  
      this.registerForm.controls['pin'].setValue(employee.pin);  
      this.registerForm.controls['phn'].setValue(employee.phn);  
      this.registerForm.controls['tc'].setValue(employee.tc);  
   
    });
   
    
  }

}
