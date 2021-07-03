import { Timestamp } from "rxjs";
import { LoginComponent } from "../componentes/inicio-sesion/login/login.component";

export class CitaDTO {
    id: Number;
    asignada: Boolean;
    fecha: Date;
    tipoCita: Number;
    usuario: Number;
    sintomatologia: Number;
    medico: Number

    constructor(pTipoCita: Number, pUsuario:Number, pSintomatologia: Number){
        this.tipoCita = pTipoCita;
        this.usuario = pUsuario;
        this.sintomatologia = pSintomatologia;
    }
}
