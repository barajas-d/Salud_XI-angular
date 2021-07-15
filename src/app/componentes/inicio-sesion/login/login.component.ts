import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InicioSesionDTO } from 'src/app/modeloDTO/inicio-sesion-dto';
import { UsuarioDto } from 'src/app/modeloDTO/usuario-dto';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Datos obtenidos
  correo: String;
  contrasena: String;

  formGroup: FormGroup;

  constructor(private _snackBar: MatSnackBar, private router: Router, private servicioInicioSesion: InicioSesionService, private formBuilder: FormBuilder) { 

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
    let result = this.servicioInicioSesion.getTypeUser(this.correo, this.contrasena);
    if(result == "administrador"){
      this.router.navigate(['administrador']);
    }
    else if(result == "call-center"){
      this.router.navigate(['buscar-citas']);
    }
    else{
      this.openSnackBar("No se encuentra el usuario", "Aceptar")
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
}
