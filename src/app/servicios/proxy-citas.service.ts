import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CitaDTO } from '../ModeloDTO/cita-dto';

@Injectable({
  providedIn: 'root'
})
export class ProxyCitasService {

  private UrlBase = environment.backendUrl + '/cita';

  constructor(private httpClient: HttpClient) { }

  prueba() {
    console.log('servicio: ON');
  }

  //Crear una nueva cita
  addCita(nuevaCita: CitaDTO){
    console.log('post: ', this.UrlBase + '/add')
    let json = JSON.stringify(nuevaCita)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<CitaDTO>(this.UrlBase + '/add', json, {headers: headers});
  }

  //Eliminar una cita no agendada
  deleteCita(idCita: Number){
    console.log('delete: ', this.UrlBase + '/add')
    return this.httpClient.delete(this.UrlBase + '/delete/' + idCita);
  }

  //Obtener las citas medicas de un usuario por medio de la cedula
  getCitasByCCUser(cedulaUsuario: Number){
    console.log('get: ', this.UrlBase + '/' + cedulaUsuario)
    return this.httpClient.get<CitaDTO[]>(this.UrlBase + '/' + cedulaUsuario)
  }

}
