import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
export class CrearCuotaModeradoraComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, private servicioProxyCuotaModeradora: ProxyCuotaModeradoraService, private router: Router) { 
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
        console.log('result: ' + result.id);
        this.navigateListarCuotasModeradoras();
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

  ngOnInit(): void {
  }

}
