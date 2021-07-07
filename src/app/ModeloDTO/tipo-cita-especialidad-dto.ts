export class TipoCitaEspecialidadDto {
    id: Number;
    especialidad: any;
    tipoCita: any;

    constructor(especialidad: Number, tipoCita: Number){
        this.especialidad = especialidad;
        this.tipoCita = tipoCita;
    }
}
