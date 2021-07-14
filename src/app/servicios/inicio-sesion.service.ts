import { Injectable } from '@angular/core';
import { getMaxListeners } from 'process';
import { InicioSesionDTO } from '../modeloDTO/inicio-sesion-dto';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  constructor() { }

  usuariosInicioSesion: InicioSesionDTO[] = [
    {id: 1, correo: "admin@saludxi.com", contrasena: "1234", rol: "administrador"},
    {id: 2, correo: "call-center@saludxi.com", contrasena: "1234", rol: "call-center"}
  ]

  getTypeUser(correo: String, contrasena: String){
    let rolReturn: String = null;
    this.usuariosInicioSesion.forEach(element => {
      console.log(element.correo + ' == ' + correo);
      if(element.correo == correo){
        if(element.contrasena == contrasena){
          rolReturn = element.rol;
        }
      }
    });
    return rolReturn;
  }

}
