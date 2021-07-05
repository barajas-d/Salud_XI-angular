import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';


const ELEMENT_DATA: any[] = [
  {nombre: 'a', cedula: 'Hydrogen', correo: 1.0079, tipoContrato: 'H'},
  {nombre: 'b', cedula: 'Hydrogen', correo: 1.0079, tipoContrato: 'H'},
  {nombre: 'c', cedula: 'Hydrogen', correo: 1.0079, tipoContrato: 'H'},
  {nombre: 'd', cedula: 'Hydrogen', correo: 1.0079, tipoContrato: 'H'},
  {nombre: 'e', cedula: 'Hydrogen', correo: 1.0079, tipoContrato: 'H'},
  {nombre: 'f', cedula: 'Hydrogen', correo: 1.0079, tipoContrato: 'H'},
  {nombre: 'g', cedula: 'Hydrogen', correo: 1.0079, tipoContrato: 'H'},
  {nombre: 'h', cedula: 'Hydrogen', correo: 1.0079, tipoContrato: 'H'},
];

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})

export class ListarUsuariosComponent implements OnInit {

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  displayedColumns: string[] = ['nombre', 'cedula', 'correo', 'tipoContrato', 'acciones'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
