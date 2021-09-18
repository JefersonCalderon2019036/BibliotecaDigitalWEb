import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/modelos/libros.module';
import { LibrosServices } from 'src/app/servicios/libros.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss'],
  providers: [LibrosServices]
})
export class LibrosComponent implements OnInit {
  TodosLosLibrosDatos: any;
  ModeloLibros: Libros;
  bloqueodelibros: any;
  bloqueodelibros2: any;
  LibrosEncontrados: any;

  constructor(
    public _LibrosServices: LibrosServices
  ) {
    this.ModeloLibros = new Libros("","","","","","",0,0,[],[],"","","",0)
  }

  ngOnInit(): void {
    this.TodosLosLibros()
  }

  TodosLosLibros(){
    this.bloqueodelibros = true
    this._LibrosServices.getTodosLosLibros().subscribe(
      res=>{
        this.TodosLosLibrosDatos = res
      },error => {
        console.log(<any>error)
      }
    )
  }

  BusquedaPorPalabrasClaves(){
    if(this.ModeloLibros.palabrasclaves){
      this.bloqueodelibros = false;
      this.bloqueodelibros2 = true;
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
      this.bloqueodelibros = true;
      this.bloqueodelibros2 = false;
    }
  }

  AgregarLibro(){
    this.ModeloLibros.tipo = "Libro"
    if(!this.ModeloLibros.imagen){
      this.ModeloLibros.imagen = "https://www.mercadodelima.pe/_nuxt/img/no-product-image.709c9b7.png"
    }
    this._LibrosServices.postAgregarUnNuevoLibro(this.ModeloLibros).subscribe(
      res => {
        this.TodosLosLibros()
        this.ModeloLibros.palabrasclaves = []
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se agrego un nuevo libro',
          showConfirmButton: false,
          timer: 2000
        })
      }, error => {
        console.log(<any>error)
      }
    )
  }

  Eliminar(){
    let id = this.ModeloLibros._id
    Swal.fire({
      title: 'Deseas eliminar este libro?',
      text: "No podras recuperar los datos de este libro si lo eliminas",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this._LibrosServices.DeleteUnLibro(id).subscribe(
          res => {
            this.TodosLosLibros()
            Swal.fire(
              'Eliminado!',
              'Se a Eliminado este libro de forma correcta',
              'success'
            )
          }, error => {
            let textoerror = <any>error.mensaje
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: textoerror,
            })
          }
        )
      }
    })
  }

  vermas(id: any){
    this._LibrosServices.getSoloUnDocumento(id).subscribe(
      res =>{
        this.ModeloLibros = res
      },error => {
        let textoerror = <any>error.error.mensaje
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: textoerror,
        })
      }
    )
  }

  EditarLibro(){
    if(!this.ModeloLibros.imagen){
      this.ModeloLibros.imagen = "https://www.mercadodelima.pe/_nuxt/img/no-product-image.709c9b7.png"
    }
    this._LibrosServices.PutEdtarUnLibro(this.ModeloLibros._id, this.ModeloLibros).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El libro de: '+this.ModeloLibros.autor+" con el titulo de: "+this.ModeloLibros.nombre+ " se a actualizado correctamente",
          showConfirmButton: false,
          timer: 2000
        })
      },error => {
        console.log(<any>error)
        let textoerror = <any>error.error.mensaje
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: textoerror,
        })
      }
    )
  }
}
