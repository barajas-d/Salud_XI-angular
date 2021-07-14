import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoContratoDto } from '../modeloDTO/tipo-contrato-dto';
import { UbicacionDto } from '../modeloDTO/ubicacion-dto';
import { UsuarioDto } from '../modeloDTO/usuario-dto';

@Injectable({
  providedIn: 'root'
})
export class ProxyUsuariosService {

  private UrlBase = environment.backendUrl + '/usuario';

  constructor(private httpClient: HttpClient) { }

  //Crear un usuario
  addUsuario(nuevoUsuario: UsuarioDto){
    let json = JSON.stringify(nuevoUsuario)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<UsuarioDto>(this.UrlBase + '/add', json, {headers: headers});
  }

  //Actualizar un usuario
  updateUsuario(usuarioActualizado: UsuarioDto){
    let json = JSON.stringify(usuarioActualizado)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<UsuarioDto>(this.UrlBase + '/update', json, {headers: headers});
  }

  //Eliminar un usuario
  deleteUsuario(idUsuario: Number){
    return this.httpClient.delete(this.UrlBase + '/delete/' + idUsuario);
  }

  //Obtener lista de usuarios con paginación
  getUsuarios(inicial: Number, cantidad: Number){
    return this.httpClient.get<UsuarioDto[]>(this.UrlBase + '/' + inicial + '/' + cantidad);
  }

  //Obtener usuario por id
  getUsuarioById(idUsuario: Number){
    return this.httpClient.get<UsuarioDto>(this.UrlBase + '/' + idUsuario);
  }

  //Obtener usuario por cedula
  getUsuarioByCC(cedulaUsuario: Number){
    return this.httpClient.get<UsuarioDto>(this.UrlBase + '/cedula/' + cedulaUsuario);
  }

  //Obtener ubicaciones
  getAllubicaciones(){
    return this.httpClient.get<UbicacionDto[]>(this.UrlBase + '/ubicaciones');
  }

  //Obtener tiposContrato
  getAllTipoContrato(){
    return this.httpClient.get<TipoContratoDto[]>(this.UrlBase + '/tiposContrato');
  }

}
