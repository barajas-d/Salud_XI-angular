import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TipoCitaDTO } from 'src/app/modeloDTO/tipo-cita-dto';
import { ProxyTiposCitaService } from 'src/app/servicios/proxy-tipos-cita.service';

@Component({
  selector: 'app-crear-tipos-cita',
  templateUrl: './crear-tipos-cita.component.html',
  styleUrls: ['./crear-tipos-cita.component.css']
})
export class CrearTiposCitaComponent {

  //regex para validar datos numericos
  regexNumericos = /^([0-9]){1,3}$/;

  //datos obtenidos del formulario
  nombre: String;
  duracion: Number;

  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private servicioProxyTipoCita: ProxyTiposCitaService, private router: Router) { 

    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required
      ]),
      duracion: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regexNumericos),
        Validators.min(30),
        Validators.max(120)
      ])
    });
  }

  addTipoCita(){
    let nuevoTipoCita = new TipoCitaDTO(this.nombre, this.duracion);
    this.servicioProxyTipoCita.addTipoCita(nuevoTipoCita).subscribe(
      result => {
        if(result == null){
          this.openSnackBar("El tipo de cita ya existe", "Aceptar")
        }
        else{
          this.navigateListarTipoCita();
          this.openSnackBar("Nuevo tipo de cita creado", "Aceptar")
        }
      }
    );
  }

  navigateListarTipoCita(){
    this.router.navigate(['listar-tipo-cita']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

}