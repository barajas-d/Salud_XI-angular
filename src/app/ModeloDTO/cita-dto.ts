import { Timestamp } from "rxjs";

export class CitaDTO {
    id: Number;
    asignada: Boolean;
    fecha: Date;
    tipoCita: any;
    usuario: any;
    sintomatologia: any;
    medico: any;

    constructor(pTipoCita: Number, pUsuario:Number, pSintomatologia: Number){
        this.tipoCita = pTipoCita;
        this.usuario = pUsuario;
        this.sintomatologia = pSintomatologia;
    }
}
