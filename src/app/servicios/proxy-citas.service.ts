import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CitaDTO } from '../modeloDTO/cita-dto';
import { SintomatologiaDTO } from '../modeloDTO/sintomatologia-dto';

@Injectable({
  providedIn: 'root'
})
export class ProxyCitasService {

  private UrlBase = environment.backendUrl + '/cita';

  constructor(private httpClient: HttpClient) { }

  //Crear una nueva cita
  addCita(nuevaCita: CitaDTO){
    let json = JSON.stringify(nuevaCita)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<CitaDTO>(this.UrlBase + '/add', json, {headers: headers});
  }

  //Eliminar una cita no agendada
  deleteCita(idCita: Number){
    return this.httpClient.delete(this.UrlBase + '/delete/' + idCita);
  }

  //Obtener las citas medicas de un usuario por medio de la cedula
  getCitasByCCUser(cedulaUsuario: Number){
    console.log('get: ', this.UrlBase + '/' + cedulaUsuario)
    return this.httpClient.get<CitaDTO[]>(this.UrlBase + '/' + cedulaUsuario);
  }

  //Obtener las sintomatologias para la creacion de nuevas citas
  getAllSintomatologias(){
    return this.httpClient.get<SintomatologiaDTO[]>(this.UrlBase + '/sintomatologias');
  }
}
