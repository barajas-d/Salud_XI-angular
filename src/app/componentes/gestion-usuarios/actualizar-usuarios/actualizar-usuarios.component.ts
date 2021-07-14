import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoContratoDto } from 'src/app/modeloDTO/tipo-contrato-dto';
import { UbicacionDto } from 'src/app/modeloDTO/ubicacion-dto';
import { UsuarioDto } from 'src/app/modeloDTO/usuario-dto';
import { ProxyUsuariosService } from 'src/app/servicios/proxy-usuarios.service';

@Component({
  selector: 'app-actualizar-usuarios',
  templateUrl: './actualizar-usuarios.component.html',
  styleUrls: ['./actualizar-usuarios.component.css']
})
export class ActualizarUsuariosComponent implements OnInit {

  //regex para validar datos numericos
  regexNumericos = /^([0-9])*$/;

  //datos del usuario a actualizar
  idUsuario: Number;
  usuario: UsuarioDto;
  usuarioCargado: Boolean = false;

  //datos para generar el formulario
  listaTiposContrato: TipoContratoDto[] = [];
  listaUbicaciones: UbicacionDto[] = [];

  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private rutaActiva: ActivatedRoute, private formBuilder: FormBuilder, private servicioProxyUsuarios: ProxyUsuariosService, private router: Router) { 
    //parametro pasado por la ruta - cedula del usuario
    this.idUsuario = this.rutaActiva.snapshot.params.idUsuario;
    this.getUsuarioByCC();

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

  updateUsuario(){
    let usuarioActualizado = new UsuarioDto(this.usuario.nombre, this.usuario.cedula, this.usuario.correo, this.usuario.tipoContrato.id, this.usuario.ubicacion.id);
    usuarioActualizado.id = this.idUsuario;
    
    this.servicioProxyUsuarios.updateUsuario(usuarioActualizado).subscribe(
      result => {
        this.navigateListarUsuario();
      }
    );
  }

  getUsuarioByCC(){
    this.servicioProxyUsuarios.getUsuarioById(this.idUsuario).subscribe(
      result => {
        this.usuario = result;
        this.usuarioCargado = true;
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


  ngOnInit(): void {
  }

}
