import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CitaDTO } from 'src/app/ModeloDTO/cita-dto';
import { SintomatologiaDTO } from 'src/app/ModeloDTO/sintomatologia-dto';
import { TipoCitaDTO } from 'src/app/ModeloDTO/tipo-cita-dto';
import { ProxyCitasService } from 'src/app/servicios/proxy-citas.service';
import { ProxyTiposCitaService } from 'src/app/servicios/proxy-tipos-cita.service';

@Component({
  selector: 'app-crear-citas',
  templateUrl: './crear-citas.component.html',
  styleUrls: ['./crear-citas.component.css']
})
export class CrearCitasComponent implements OnInit {
  
  //Datos para crear los formularios
  @Input() usuarioId: Number = 0;
  listaTiposCita: TipoCitaDTO[] = [];
  listaSintomatologias: SintomatologiaDTO[] = [];

  //datos obtenidos del formulario
  tipoCitaSeleccionada: Number;
  sintomatologiaSeleccionada: Number;

  //formGroup para validar campos del formulario
  formGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private servicioProxyTipoCita: ProxyTiposCitaService, private servicioProxyCitas: ProxyCitasService) { 

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
    this.servicioProxyCitas.addCita(new CitaDTO(this.tipoCitaSeleccionada, this.usuarioId, this.sintomatologiaSeleccionada)).subscribe(
      result => {
        console.log('result: ' + result.id);
      }
    );
    console.log('cita seleccionada: ' + this.tipoCitaSeleccionada + ' sintomatologia: ' + this.sintomatologiaSeleccionada);
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

  ngOnInit(){}
}
