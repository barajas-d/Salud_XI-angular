import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AgendaDto } from 'src/app/modeloDTO/agenda-dto';
import { CitaDTO } from 'src/app/modeloDTO/cita-dto';
import { CuotaModeradoraDto } from 'src/app/modeloDTO/cuota-moderadora-dto';
import { ProxyAgendasService } from 'src/app/servicios/proxy-agendas.service';
import { ProxyCuotaModeradoraService } from 'src/app/servicios/proxy-cuota-moderadora.service';

@Component({
  selector: 'app-listar-agenda',
  templateUrl: './listar-agenda.component.html',
  styleUrls: ['./listar-agenda.component.css']
})
export class ListarAgendaComponent implements OnInit {

  listaCitas: CitaDTO[] = [];
  cedulaMedico: Number;
  fechaSeleccionada: Date = new Date();
  
  listaCuotasModeradoras: CuotaModeradoraDto[] = [];

  //formGroup para validar campos del formulario
  formGroup: FormGroup;
  //regex para validar datos numericos
  regexNumericos = /^([0-9])*$/

  displayedColumns: string[] = ['fecha', 'nombre', 'cedula', 'sintomatologia', 'tipoCita', 'tipoContrato', "cuotaModeradora"];

  constructor(private rutaActiva: ActivatedRoute, private formBuilder: FormBuilder, private servicioProxyAgendas: ProxyAgendasService, private servicioProxyCuotaModeradora: ProxyCuotaModeradoraService) { 
    //Parametros pasados en la ruta
    this.cedulaMedico = this.rutaActiva.snapshot.params.cedulaUsuario;

    //Construccion de agendas
    this.getCuotasModeradoras();

    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      cedula: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regexNumericos)
      ])
    });
  }

  getCitasByCCMedico(){
    let agendaDto = new AgendaDto(this.cedulaMedico, this.fechaSeleccionada.getDate(), this.fechaSeleccionada.getMonth() + 1, this.fechaSeleccionada.getFullYear());
    this.servicioProxyAgendas.getAgenda(agendaDto).subscribe(
      result => {
        this.listaCitas = result;
        this.formatDate();
      }
    );
  }

  getCuotasModeradoras(){
    this.servicioProxyCuotaModeradora.getCuotasModeradoras().subscribe(
      result => {
        this.listaCuotasModeradoras = result;
        console.log(this.listaCuotasModeradoras)
      }
    );
  }

  formatDate(){
    if(this.listaCitas != null){
      this.listaCitas.forEach(cita => {
        let nueva = new Date(cita.fecha);
        cita.fecha = nueva;
      });
    }
  }

  dateChange($event){
    this.fechaSeleccionada = $event.target.value;
    this.getCitasByCCMedico();
  }

  getValorCuotaModeradora(tipoCitaId: Number, tipoContratoId: Number){
    let valorCuotaModeradora;
    this.listaCuotasModeradoras.forEach(cuotaModeradora => { 
      if(cuotaModeradora.tipoCita.id == tipoCitaId && cuotaModeradora.tiposContrato.id == tipoContratoId){
        valorCuotaModeradora = cuotaModeradora.valor;
      } 
    });
    if(valorCuotaModeradora == null){
      return 'No definido';
    }
    return valorCuotaModeradora;
  }

  ngOnInit(): void {
  }

}
