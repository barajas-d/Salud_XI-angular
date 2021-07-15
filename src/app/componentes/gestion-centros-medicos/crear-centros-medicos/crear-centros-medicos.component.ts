import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CentroMedicoDto } from 'src/app/modeloDTO/centro-medico-dto';
import { ProxyCentrosMedicosService } from 'src/app/servicios/proxy-centros-medicos.service';

@Component({
  selector: 'app-crear-centros-medicos',
  templateUrl: './crear-centros-medicos.component.html',
  styleUrls: ['./crear-centros-medicos.component.css']
})
export class CrearCentrosMedicosComponent {

  //datos obtenidos del formulario
  nombre: String;

  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private servicioProxyCentrosMedicos: ProxyCentrosMedicosService, private router: Router) { 

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
        if(result == null){
          this.openSnackBar("No se puede crear el centro médico", "Aceptar")
        }
        else{
          this.navigateListarCentrosMedicos();
          this.openSnackBar("Nuevo centro médico creado", "Aceptar")
        }
      }
    );
  }

  navigateListarCentrosMedicos(){
    this.router.navigate(['listar-centros-medicos']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

}
