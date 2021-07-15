import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CentroMedicoDto } from 'src/app/modeloDTO/centro-medico-dto';
import { EspecialidadDto } from 'src/app/modeloDTO/especialidad-dto';
import { MedicoDto } from 'src/app/modeloDTO/medico-dto';
import { ProxyMedicosService } from 'src/app/servicios/proxy-medicos.service';

@Component({
  selector: 'app-crear-medicos',
  templateUrl: './crear-medicos.component.html',
  styleUrls: ['./crear-medicos.component.css']
})
export class CrearMedicosComponent {

  //regex para validar datos numericos
  regexNumericos = /^([0-9])*$/

  //datos obtenidos del formulario
  nombre: String;
  cedula: Number;
  especialidadSeleccionada: Number;
  centroMedicoSeleccionado: Number;
  intensidadHorariaSeleccionada: Number;

  //datos para generar los formularios
  listaEspecialidades: EspecialidadDto[] = [];
  listaCentrosMedicos: CentroMedicoDto[] = [];

  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private servicioProxyMedicos: ProxyMedicosService, private router: Router) { 

    //Obciones de formulario
    this.getAllEspecialidades();
    this.getAllCentrosMedicos();

    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required
      ]),
      especialidad: new FormControl('', [
        Validators.required
      ]),
      centroMedico: new FormControl('', [
        Validators.required
      ]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regexNumericos)
      ]),
      intensidadHoraria: new FormControl('', [
        Validators.required
      ]),
    });
  }

  addMedico(){
    let nuevoMedico = new MedicoDto(this.nombre, this.cedula, this.intensidadHorariaSeleccionada, this.centroMedicoSeleccionado, this.especialidadSeleccionada);
    this.servicioProxyMedicos.addMedico(nuevoMedico).subscribe(
      result => {
        if(result == null){
          this.openSnackBar("No es posible crear al médico con esta información", "Aceptar")
        }
        else{
          this.openSnackBar("Nuevo médico creado", "Aceptar")
          this.navigateListarMedicos();
        }
      }
    );
  }

  getAllEspecialidades(){
    this.servicioProxyMedicos.getAllEspecialidades().subscribe(
      result => {
        this.listaEspecialidades = result;
      }
    );
  }

  getAllCentrosMedicos(){
    this.servicioProxyMedicos.getAllCentrosMedicos().subscribe(
      result => {
        this.listaCentrosMedicos = result;
      }
    );
  }

  navigateListarMedicos(){
    this.router.navigate(['listar-medicos']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

}
