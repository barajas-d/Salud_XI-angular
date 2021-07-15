import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CuotaModeradoraDto } from 'src/app/modeloDTO/cuota-moderadora-dto';
import { TipoCitaDTO } from 'src/app/modeloDTO/tipo-cita-dto';
import { TipoContratoDto } from 'src/app/modeloDTO/tipo-contrato-dto';
import { ProxyCuotaModeradoraService } from 'src/app/servicios/proxy-cuota-moderadora.service';

@Component({
  selector: 'app-crear-cuota-moderadora',
  templateUrl: './crear-cuota-moderadora.component.html',
  styleUrls: ['./crear-cuota-moderadora.component.css']
})
export class CrearCuotaModeradoraComponent {

  //regex para validar datos numericos
  regexNumericos = /^([0-9])*$/;

  //datos obtenidos del formulario
  valor: Number;
  tipoContratoSeleccionado: Number;
  tipoCitaSeleccionada: Number;

  //datos para generar el formulario
  listaTiposContrato: TipoContratoDto[] = [];
  listaTiposCita: TipoCitaDTO[] = [];

  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private servicioProxyCuotaModeradora: ProxyCuotaModeradoraService, private router: Router) { 
    //Obciones de formulario
    this.getAllTiposCitas();
    this.getAllTiposContrato();

    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      valor: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regexNumericos)
      ]),
      tipoCita: new FormControl('', [
        Validators.required
      ]),
      tipoContrato: new FormControl('', [
        Validators.required
      ]),
    });
  }

  addCuotaModeradora(){
    let nuevaCuotaModeradora = new CuotaModeradoraDto(this.tipoCitaSeleccionada, this.tipoContratoSeleccionado, this.valor);
    this.servicioProxyCuotaModeradora.addCuotaModeradora(nuevaCuotaModeradora).subscribe(
      result => {
        if(result == null){
          this.openSnackBar("Esta cuota moderadora ya esta parametrizada", "Aceptar")
        }
        else{
          this.openSnackBar("Parametro para cuota moderadora creado", "Aceptar")
          this.navigateListarCuotasModeradoras();
        }
      }
    );
  }

  getAllTiposCitas(){
    this.servicioProxyCuotaModeradora.getAllTiposCita().subscribe(
      result => {
        this.listaTiposCita = result;
      }
    );
  }

  getAllTiposContrato(){
    this.servicioProxyCuotaModeradora.getAllTiposContrato().subscribe(
      result => {
        this.listaTiposContrato = result;
      }
    );
  }

  navigateListarCuotasModeradoras(){
    this.router.navigate(['listar-cuotas-moderadoras']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

}
