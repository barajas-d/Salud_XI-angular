export class TipoCitaDTO {
    id: Number;
    nombre: String;
    duracion: Number;

    constructor(nombre: String, duracion: Number){
        this.nombre = nombre;
        this.duracion = duracion;
    }
}
