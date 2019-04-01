import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';

import { noWhitespaceValidator , ValidateUrl  } from '../../shared/app.validators'; //custom validator

import { MyServiceService } from '../../services/my-service.service';

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


  constructor(private frmBuilder : FormBuilder , private myService:MyServiceService) { 

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
    console.log('fname=' + this.f.fname.value);

    let empdata =this.registerForm.value;
    empdata["id"]=new Date().getTime();
    this.myService.createEmployee(empdata).subscribe( data => {
      alert("Employee created successfully.");
      console.log(data);
    });
  }

}
