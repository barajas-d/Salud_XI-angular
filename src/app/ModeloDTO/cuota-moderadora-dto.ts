export class CuotaModeradoraDto {
    id: Number;
    tipoCita: any;
    tiposContrato: any;
    valor: Number;

    constructor(tipoCita: Number, tipoContrato: Number, valor: Number){
        this.tipoCita = tipoCita;
        this.tiposContrato = tipoContrato;
        this.valor = valor;
    }
}