import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { resolve } from 'dns';
import { promise } from 'protractor';
import { CitaDTO } from 'src/app/modeloDTO/cita-dto';
import { ProxyCitasService } from 'src/app/servicios/proxy-citas.service';
import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-buscar-citas',
  templateUrl: './buscar-citas.component.html',
  styleUrls: ['./buscar-citas.component.css']
})
export class BuscarCitasComponent implements OnInit {

  formGroup: FormGroup;

  citaNueva: CitaDTO;

  cedulaUsuario: Number;

  constructor(private formBuilder: FormBuilder, private servicioProxyCitas: ProxyCitasService, private router: Router) {
    //Validaciones del formulario

    let regexNumerico = /^[0-9]*$/
    this.formGroup = this.formBuilder.group({
      cedulaUsuario: new FormControl('', [
        Validators.required,
        Validators.pattern(regexNumerico) // Validar que el campo se componga con datos numericos 
      ])
    });

  }

  ngOnInit(): void {
  }
  
  navigateListarCitas(){
    this.router.navigate(['listar-citas/' + this.cedulaUsuario]);
  }

  addCita(){
    let citaDTO = new CitaDTO(1,1,1);
    console.log('Cita A Crear: ', citaDTO);

    this.servicioProxyCitas.addCita(citaDTO).subscribe(result => {
      this.citaNueva = result;
      console.log('llega: ' + this.citaNueva.id);
    });
  }

  deleteCita(){
    let id = 1
    this.servicioProxyCitas.deleteCita(id).subscribe(result => {
      console.log('llega: ' + result);
    });
  }

}
