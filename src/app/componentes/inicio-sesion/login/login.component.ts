import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { 

    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      usuario: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      contrasena: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
  }

  ingresar() {
    console.log(this.formGroup);
    
  }
}
