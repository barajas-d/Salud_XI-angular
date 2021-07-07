import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoContratoDto } from 'src/app/modeloDTO/tipo-contrato-dto';
import { UbicacionDto } from 'src/app/modeloDTO/ubicacion-dto';
import { UsuarioDto } from 'src/app/modeloDTO/usuario-dto';
import { ProxyUsuariosService } from 'src/app/servicios/proxy-usuarios.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  //regex para validar datos numericos
  regexNumericos = /^([0-9])*$/;

  //datos obtenidos del formulario
  nombre: String;
  cedula: Number;
  correo: String;
  tipoContratoSeleccionado: Number;
  ubicacionSeleccionada: Number;

  //datos para generar el formulario
  listaTiposContrato: TipoContratoDto[] = [];
  listaUbicaciones: UbicacionDto[] = [];
  
  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private servicioProxyUsuarios: ProxyUsuariosService) { 

    //Obciones de formulario
    this.getAllUbicaciones();
    this.getAllTiposContrato();

    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required
      ]),
      correo: new FormControl('', [
        Validators.required
      ]),
      ubicacion: new FormControl('', [
        Validators.required
      ]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regexNumericos)
      ]),
      tipoContrato: new FormControl('', [
        Validators.required
      ]),
    });
  }

  addUsuario(){
    let nuevoUsuario = new UsuarioDto(this.nombre, this.cedula, this.correo, this.tipoContratoSeleccionado, this.ubicacionSeleccionada);
    this.servicioProxyUsuarios.addUsuario(nuevoUsuario).subscribe(
      result => {
        console.log('result: ' + result.id);
      }
    );
  }

  getAllUbicaciones(){
    this.servicioProxyUsuarios.getAllubicaciones().subscribe(
      result => {
        this.listaUbicaciones = result;
      }
    );
  }

  getAllTiposContrato(){
    this.servicioProxyUsuarios.getAllTipoContrato().subscribe(
      result => {
        this.listaTiposContrato = result;
      }
    );
  }

  ngOnInit(): void {
  }

}
