export class MedicoDto {

    id: Number;
    nombre: String;
    cedula: Number;
    intensidadHoraria: Number;
    centroMedico: any;
    especialidad: any;

    constructor(pNombre: String, pCedula: Number, pIntensidadHoraria: Number, pCentroMedico: any, pEspecialidad: any){
        this.nombre = pNombre;
        this.cedula = pCedula;
        this.intensidadHoraria = pIntensidadHoraria;
        this.centroMedico = pCentroMedico;
        this.especialidad = pEspecialidad;
    }

}
