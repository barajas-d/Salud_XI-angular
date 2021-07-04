import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoCitaDTO } from '../ModeloDTO/tipo-cita-dto';

@Injectable({
  providedIn: 'root'
})
export class ProxyTiposCitaService {

  private UrlBase = environment.backendUrl + '/tiposDeCita';

  constructor(private httpClient: HttpClient) { }

  //Obtener todos los tipos de cita
  getAllTiposCita(){
    console.log('get: ', this.UrlBase)
    return this.httpClient.get<TipoCitaDTO[]>(this.UrlBase)
  }

}
