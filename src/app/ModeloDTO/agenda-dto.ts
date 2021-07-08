export class AgendaDto {
    cedulaMedico: Number;
    dia: Number;
    mes: Number;
    anio: Number;

    constructor(cedulaMedico: Number, dia: Number, mes: Number, anio: Number){
        this.cedulaMedico = cedulaMedico;
        this.dia = dia;
        this.mes = mes;
        this.anio = anio;
    }
}