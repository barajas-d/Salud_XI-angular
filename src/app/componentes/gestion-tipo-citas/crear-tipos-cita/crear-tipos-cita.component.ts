import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoCitaDTO } from 'src/app/modeloDTO/tipo-cita-dto';
import { ProxyTiposCitaService } from 'src/app/servicios/proxy-tipos-cita.service';

@Component({
  selector: 'app-crear-tipos-cita',
  templateUrl: './crear-tipos-cita.component.html',
  styleUrls: ['./crear-tipos-cita.component.css']
})
export class CrearTiposCitaComponent implements OnInit {

  //regex para validar datos numericos
  regexNumericos = /^([0-9])*$/;

  //datos obtenidos del formulario
  nombre: String;
  duracion: Number;

  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private servicioProxyTipoCita: ProxyTiposCitaService) { 

    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required
      ]),
      duracion: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regexNumericos)
      ])
    });
  }

  addTipoCita(){
    let nuevoTipoCita = new TipoCitaDTO(this.nombre, this.duracion);
    this.servicioProxyTipoCita.addTipoCita(nuevoTipoCita).subscribe(
      result => {
        console.log('result: ' + result.id);
      }
    );
  }

  ngOnInit(): void {
  }

}