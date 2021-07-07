import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoCitaDTO } from '../modeloDTO/tipo-cita-dto';

@Injectable({
  providedIn: 'root'
})
export class ProxyTiposCitaService {

  private UrlBase = environment.backendUrl + '/tiposDeCita';

  constructor(private httpClient: HttpClient) { }

  //Crear un tipo de cita
  addTipoCita(tipoCita: TipoCitaDTO){
    let json = JSON.stringify(tipoCita)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<TipoCitaDTO>(this.UrlBase + '/add', json, {headers: headers});
  }

  //Actualizar un tipo de cita
  updateTipoCita(tipoCitaActualizado: TipoCitaDTO){
    let json = JSON.stringify(tipoCitaActualizado)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<TipoCitaDTO>(this.UrlBase + '/update', json, {headers: headers});
  }

  //Eliminar un tipo de cita
  deleteTipoCita(idTipoCita: Number){
    return this.httpClient.delete(this.UrlBase + '/delete/' + idTipoCita);
  }

  //Obtener lista de usuarios con paginación
  getTiposCita(inicial: Number, cantidad: Number){
    return this.httpClient.get<TipoCitaDTO[]>(this.UrlBase + '/' + inicial + '/' + cantidad);
  }

  //Obtener todos los tipos de cita
  getAllTiposCita(){
    console.log('get: ', this.UrlBase)
    return this.httpClient.get<TipoCitaDTO[]>(this.UrlBase)
  }

}
