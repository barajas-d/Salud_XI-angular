import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CentroMedicoDto } from 'src/app/modeloDTO/centro-medico-dto';
import { ProxyCentrosMedicosService } from 'src/app/servicios/proxy-centros-medicos.service';

@Component({
  selector: 'app-crear-centros-medicos',
  templateUrl: './crear-centros-medicos.component.html',
  styleUrls: ['./crear-centros-medicos.component.css']
})
export class CrearCentrosMedicosComponent implements OnInit {

  //datos obtenidos del formulario
  nombre: String;

  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private servicioProxyCentrosMedicos: ProxyCentrosMedicosService, private router: Router) { 

    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required
      ])
    });
  }

  addCentroMedico(){
    let nuevoCentroMedico = new CentroMedicoDto(this.nombre);
    this.servicioProxyCentrosMedicos.addCentroMedico(nuevoCentroMedico).subscribe(
      result => {
        console.log('result: ' + result);
        this.navigateListarCentrosMedicos();
      }
    );
  }

  navigateListarCentrosMedicos(){
    this.router.navigate(['listar-centros-medicos']);
  }

  ngOnInit(): void {
  }

}
