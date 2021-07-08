import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CentroMedicoDto } from 'src/app/modeloDTO/centro-medico-dto';
import { EspecialidadDto } from 'src/app/modeloDTO/especialidad-dto';
import { MedicoDto } from 'src/app/modeloDTO/medico-dto';
import { ProxyMedicosService } from 'src/app/servicios/proxy-medicos.service';

@Component({
  selector: 'app-crear-medicos',
  templateUrl: './crear-medicos.component.html',
  styleUrls: ['./crear-medicos.component.css']
})
export class CrearMedicosComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, private servicioProxyMedicos: ProxyMedicosService) { 

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
        console.log('result: ' + result.id);
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

  ngOnInit(): void {
  }

}
