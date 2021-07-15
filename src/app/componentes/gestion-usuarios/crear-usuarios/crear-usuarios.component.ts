import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TipoContratoDto } from 'src/app/modeloDTO/tipo-contrato-dto';
import { UbicacionDto } from 'src/app/modeloDTO/ubicacion-dto';
import { UsuarioDto } from 'src/app/modeloDTO/usuario-dto';
import { ProxyUsuariosService } from 'src/app/servicios/proxy-usuarios.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent {

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

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private servicioProxyUsuarios: ProxyUsuariosService, private router: Router) { 

    //Obciones de formulario
    this.getAllUbicaciones();
    this.getAllTiposContrato();

    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.email
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
        if(result == null){
          this.openSnackBar("El usuario con cedula " + this.cedula + " ya existe", "Aceptar")
        }
        else{
          this.openSnackBar("Usuario creado correctamente", "Aceptar")
          this.navigateListarUsuario();
        }
      },
      error => {
        console.log(error);
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

  navigateListarUsuario(){
    this.router.navigate(['listar-usuarios']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

}
