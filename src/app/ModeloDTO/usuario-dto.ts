export class UsuarioDto {

    id: Number;
    nombre: String;
    cedula: Number;
    correo: String;
    tipoContrato: any;
    ubicacion: any;
    
    constructor(pNombre: String, pCedula: Number, pCorreo: String, pTipoContrato: Number, pUbicacion: Number){
        this.nombre = pNombre;
        this.cedula = pCedula;
        this.correo = pCorreo;
        this.tipoContrato = pTipoContrato;
        this.ubicacion = pUbicacion;
    }
}
