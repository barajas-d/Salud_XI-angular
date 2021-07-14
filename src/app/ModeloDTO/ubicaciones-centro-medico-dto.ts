export class UbicacionesCentroMedicoDTO {
    id: Number;
    centroMedico: any;
    ubicacion: any;

    constructor(centroMedico: Number, ubicacion: Number){
        this.centroMedico = centroMedico;
        this.ubicacion = ubicacion;
    }
}