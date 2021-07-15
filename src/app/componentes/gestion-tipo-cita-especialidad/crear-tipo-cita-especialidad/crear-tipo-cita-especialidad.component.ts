import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EspecialidadDto } from 'src/app/modeloDTO/especialidad-dto';
import { TipoCitaDTO } from 'src/app/modeloDTO/tipo-cita-dto';
import { TipoCitaEspecialidadDto } from 'src/app/modeloDTO/tipo-cita-especialidad-dto';
import { ProxyTipoCitaEspecialidadService } from 'src/app/servicios/proxy-tipo-cita-especialidad.service';

@Component({
  selector: 'app-crear-tipo-cita-especialidad',
  templateUrl: './crear-tipo-cita-especialidad.component.html',
  styleUrls: ['./crear-tipo-cita-especialidad.component.css']
})
export class CrearTipoCitaEspecialidadComponent {

  //datos obtenidos del formulario
  especialidadSeleccionada: Number;
  tipoCitaSeleccionado: Number;

  //datos para generar el formulario
  listaEspecialidades: EspecialidadDto[] = [];
  listaTiposCita: TipoCitaDTO[] = [];

  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private servicioProxyTipoCitaEspecialidad: ProxyTipoCitaEspecialidadService, private router: Router) { 
    
    //Obciones de formulario
    this.getAllEspecialidades();
    this.getAllTiposCita();

    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      especialidad: new FormControl('', [
        Validators.required
      ]),
      tipoCita: new FormControl('', [
        Validators.required
      ])
    });

  }

  addTipoCitaEspecialidad(){
    let nuevoTipoCitaEspecialidad = new TipoCitaEspecialidadDto(this.especialidadSeleccionada, this.tipoCitaSeleccionado);
    this.servicioProxyTipoCitaEspecialidad.addTipoCitaEspecialidad(nuevoTipoCitaEspecialidad).subscribe(
      result => {
        if(result == null){
          this.openSnackBar("El parametro ya existe", "Aceptar")
        }
        else{
          this.openSnackBar("Parametro creado correctamente", "Aceptar")
          this.navigateListarTipoCitaEspecialidad();
        }
      }
    );
  }

  getAllEspecialidades(){
    this.servicioProxyTipoCitaEspecialidad.getAllEspecialidades().subscribe(
      result => {
        this.listaEspecialidades = result;
      }
    );
  }

  getAllTiposCita(){
    this.servicioProxyTipoCitaEspecialidad.getAllTiposCita().subscribe(
      result => {
        this.listaTiposCita = result;
      }
    );
  }

  navigateListarTipoCitaEspecialidad(){
    this.router.navigate(['listar-tipo-cita-especialidad']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

}
