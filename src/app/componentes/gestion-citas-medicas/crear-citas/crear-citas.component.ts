import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitaDTO } from 'src/app/modeloDTO/cita-dto';
import { SintomatologiaDTO } from 'src/app/modeloDTO/sintomatologia-dto';
import { TipoCitaDTO } from 'src/app/modeloDTO/tipo-cita-dto';
import { ProxyCitasService } from 'src/app/servicios/proxy-citas.service';
import { ProxyTiposCitaService } from 'src/app/servicios/proxy-tipos-cita.service';

@Component({
  selector: 'app-crear-citas',
  templateUrl: './crear-citas.component.html',
  styleUrls: ['./crear-citas.component.css']
})
export class CrearCitasComponent {

  @Output() actualizar = new EventEmitter<Boolean>();

  //Datos para crear los formularios
  @Input() cedulaUsuario: Number;
  listaTiposCita: TipoCitaDTO[] = [];
  listaSintomatologias: SintomatologiaDTO[] = [];

  //datos obtenidos del formulario
  tipoCitaSeleccionada: Number;
  sintomatologiaSeleccionada: Number;

  //formGroup para validar campos del formulario
  formGroup: FormGroup;
  
  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private servicioProxyTipoCita: ProxyTiposCitaService, private servicioProxyCitas: ProxyCitasService) { 

    this.getAllTiposCita();
    this.getAllSintomatologias();
    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      sintomatologia: new FormControl('', [
        Validators.required
      ]),
      tipoCita: new FormControl('', [
        Validators.required
      ])
    });

  }

  //crear cita medica
  addCitaMedica(){
    this.servicioProxyCitas.addCita(new CitaDTO(this.tipoCitaSeleccionada, this.cedulaUsuario, this.sintomatologiaSeleccionada)).subscribe( //Cambiar por el id del usuario
      result => {
        if(result == null){
          this.openSnackBar("No se puede crear la cita médica", "Aceptar")
        }
        else{
          this.openSnackBar("Nueva cita médica creada", "Aceptar") 
          this.actualizar.emit(true);
        }
      }
    );
  }

  //obtener sintomatologias para el form
  getAllSintomatologias(){
    this.servicioProxyCitas.getAllSintomatologias().subscribe(
      result => {
        this.listaSintomatologias = result;
      }
    );
  }

  //obtener citas para el form
  getAllTiposCita(){
    this.servicioProxyTipoCita.getAllTiposCita().subscribe(
      result => {
        this.listaTiposCita = result;
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

}
