import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { resolve } from 'dns';
import { promise } from 'protractor';
import { CitaDTO } from 'src/app/modeloDTO/cita-dto';
import { UsuarioDto } from 'src/app/modeloDTO/usuario-dto';
import { ProxyCitasService } from 'src/app/servicios/proxy-citas.service';
import { ProxyUsuariosService } from 'src/app/servicios/proxy-usuarios.service';
import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-buscar-citas',
  templateUrl: './buscar-citas.component.html',
  styleUrls: ['./buscar-citas.component.css']
})
export class BuscarCitasComponent {

  formGroup: FormGroup;

  //Datos del usuario
  cedulaUsuario: Number;
  usuario: UsuarioDto = null;
  usuarioCargado: Boolean = false;

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private servicioProxyUsuario: ProxyUsuariosService, private router: Router) {
    //Validaciones del formulario

    let regexNumerico = /^[0-9]*$/
    this.formGroup = this.formBuilder.group({
      cedulaUsuario: new FormControl('', [
        Validators.required,
        Validators.pattern(regexNumerico) // Validar que el campo se componga con datos numericos 
      ])
    });

  }
  
  navigateListarCitas(){
    this.servicioProxyUsuario.getUsuarioByCC(this.cedulaUsuario).subscribe(
      result => {
        if(result == null){
          this.openSnackBar("No se encontro el usuario con cedula " + this.cedulaUsuario, "Aceptar")
        }
        else{
          this.router.navigate(['listar-citas/' + this.cedulaUsuario]);
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
  
}
