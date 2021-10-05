import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libros } from 'src/app/modelos/libros.module';
import { LibrosServices } from 'src/app/servicios/libros.services';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [LibrosServices,UsuarioService]
})
export class PrincipalComponent implements OnInit {
  DocumentosMasVistos: any;
  ModeloLibros: Libros;
  bloqueodedatosporbusqueda: any;
  LibrosEncontrados: any;
  resutladosdelabusqueda: any;
  TodosLosLibros: any;
  SoloUnDocumento: any;
  TodaLasRevistasd: any;

  constructor(
    private _LibrosServices: LibrosServices,
    private _router: Router
  ) {
    this.ModeloLibros = new Libros("","","","","","",0,0,[],[],"","","",0,0)
   }

  ngOnInit(): void {
    this.getLibrosMasVistos()
    this.getTodosLosLibros()
    this.getTodosLosLibros()
    this.getTodasLasRevistas()
    this.bloqueodedatosporbusqueda = true;
    this.resutladosdelabusqueda = false;
  }

  getLibrosMasVistos(){
    this._LibrosServices.getlibrosmasvistos().subscribe(
      res => {
        this.DocumentosMasVistos = res;
      },(error) => {
        console.log(<any>error);
        let textoalaer = <any>error.error.mensaje
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: textoalaer
        })
      }
    )
  }

  getUnDocumento(id: any){
    this._router.navigate(['/detallesdocumento',id])
  }

  BusquedaPalabrasClave(){
    if(this.ModeloLibros.palabrasclaves){
      this.bloqueodedatosporbusqueda = false;
      this.resutladosdelabusqueda = true;
      this._LibrosServices.getBusquedaPorPalabrasClave(this.ModeloLibros).subscribe(
        res=>{
          this.LibrosEncontrados = res;
        },
        (error) => {
          console.log(<any>error);
          let textoalaer = <any>error.error.mensaje
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: textoalaer
          })
        }
      )
    }else{
      this.bloqueodedatosporbusqueda = true;
      this.resutladosdelabusqueda = false;
    }
  }

  getTodosLosLibros(){
    this._LibrosServices.getTodosLosLibros().subscribe(
      res => {
        this.TodosLosLibros = res;
      }
    )
  }

  getTodasLasRevistas(){
    this._LibrosServices.getTodasLasRevistas().subscribe(
      res =>{
        this.TodaLasRevistasd = res;
      }
    )
  }
}
