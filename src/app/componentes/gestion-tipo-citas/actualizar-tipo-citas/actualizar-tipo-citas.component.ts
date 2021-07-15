import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoCitaDTO } from 'src/app/modeloDTO/tipo-cita-dto';
import { ProxyTiposCitaService } from 'src/app/servicios/proxy-tipos-cita.service';

@Component({
  selector: 'app-actualizar-tipo-citas',
  templateUrl: './actualizar-tipo-citas.component.html',
  styleUrls: ['./actualizar-tipo-citas.component.css']
})
export class ActualizarTipoCitasComponent {

  //regex para validar datos numericos
  regexNumericos = /^([0-9]){1,3}$/;

  //datos tipo de cita a actualizar
  idTipoCita: Number;
  tipoCita: TipoCitaDTO;
  tipoCitaCargado: Boolean = false;

  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private _snackBar: MatSnackBar, private rutaActiva: ActivatedRoute, private formBuilder: FormBuilder, private servicioProxyTipoCita: ProxyTiposCitaService, private router: Router) { 
    //parametro pasado por la ruta - cedula del medico
    this.idTipoCita = this.rutaActiva.snapshot.params.idTipoCita;
    this.getTipoCitaById();

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

  updateTipoCita(){
    let tipoCitaActualizado = new TipoCitaDTO(this.tipoCita.nombre, this.tipoCita.duracion);
    tipoCitaActualizado.id = this.idTipoCita;

    this.servicioProxyTipoCita.updateTipoCita(tipoCitaActualizado).subscribe(
      result => {
        if(result == null){
          this.openSnackBar("No se puede actualizar la información del tipo de cita", "Aceptar")
        }
        else{
          this.openSnackBar("El tipo de cita fue actualizado correctamente", "Aceptar")
          this.navigateListarTipoCita();
        }
      }
    );
  }

  getTipoCitaById(){
    this.servicioProxyTipoCita.getTipoCitaById(this.idTipoCita).subscribe(
      result => {
        this.tipoCita = result;
        this.tipoCitaCargado = true;
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
