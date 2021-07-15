import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CentroMedicoDto } from 'src/app/modeloDTO/centro-medico-dto';
import { EspecialidadDto } from 'src/app/modeloDTO/especialidad-dto';
import { MedicoDto } from 'src/app/modeloDTO/medico-dto';
import { ProxyMedicosService } from 'src/app/servicios/proxy-medicos.service';

@Component({
  selector: 'app-actualizar-medicos',
  templateUrl: './actualizar-medicos.component.html',
  styleUrls: ['./actualizar-medicos.component.css']
})
export class ActualizarMedicosComponent {

  //regex para validar datos numericos
  regexNumericos = /^([0-9])*$/

  //datos del medico a actualizar
  cedulaMedico: Number;
  medico: MedicoDto;
  medicoCargado: Boolean = false;

  //datos para generar los formularios
  listaEspecialidades: EspecialidadDto[] = [];
  listaCentrosMedicos: CentroMedicoDto[] = [];

  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private _snackBar: MatSnackBar, private rutaActiva: ActivatedRoute ,private formBuilder: FormBuilder, private servicioProxyMedicos: ProxyMedicosService, private router: Router) { 
    //parametro pasado por la ruta - cedula del medico
    this.cedulaMedico = this.rutaActiva.snapshot.params.cedulaMedico;
    this.getMedicoByCC();
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

  updateMedico(){ 
    let medicoActualizado: MedicoDto = new MedicoDto(this.medico.nombre, this.medico.cedula, this.medico.intensidadHoraria, this.medico.centroMedico.id, this.medico.especialidad.id);
    medicoActualizado.id = this.medico.id;

    this.servicioProxyMedicos.updateMedico(medicoActualizado).subscribe(
      result => {
        if(result == null){
          this.openSnackBar("No se puede actualizar la información del médico", "Aceptar")
        }
        else{
          this.openSnackBar("Información del médico actualizado", "Aceptar")
          this.navigateListarMedicos();
        }
      }
    );
  }
  
  getMedicoByCC(){
    this.servicioProxyMedicos.getMedico(this.cedulaMedico).subscribe(
      result => {
        this.medico = result;
        this.medicoCargado = true;
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
