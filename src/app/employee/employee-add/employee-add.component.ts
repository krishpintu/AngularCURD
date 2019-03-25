import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  registerForm :FormGroup;
  submitted = false;

  constructor(private frmBuilder : FormBuilder) { 

  }

  ngOnInit() {

    this.registerForm =this.frmBuilder.group(
      {
        fname: ['', Validators.required],
        lname : ['',Validators.required],
        email: ['', [Validators.required, Validators.email]],
        pin: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  //catch all controls
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    /*this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }*/
    console.log('fname=' + this.f.fname.value);
    console.log('lname=' + this.f.lname.value);
    console.log('email=' + this.f.email.value);
    console.log('pin=' + this.f.email.value);
  }

}
