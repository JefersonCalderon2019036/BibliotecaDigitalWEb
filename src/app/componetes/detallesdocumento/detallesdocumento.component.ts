import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prestamos } from 'src/app/modelos/prestamos.module';
import { LibrosServices } from 'src/app/servicios/libros.services';
import { PrestamoServicio } from 'src/app/servicios/prestamos.servicios';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallesdocumento',
  templateUrl: './detallesdocumento.component.html',
  styleUrls: ['./detallesdocumento.component.scss'],
  providers: [LibrosServices,PrestamoServicio,UsuarioService]
})
export class DetallesdocumentoComponent implements OnInit {
  ModeloPrestamos: Prestamos;
  idrutadocumento: any;
  LibroEncontrado: any;
  bloqueportipo: any;
  bloqueoprestamo: any;
  bloqueoprestamo2: any;
  iduser: any;
  bloqueodebotones: any;
  bloquedebotones2: any;
  carnet: any;

  constructor(
    private _PrestamoServicio: PrestamoServicio,
    private _LibrosServices: LibrosServices,
    public _usuarioService: UsuarioService,
    private _router: Router,
    public _activatedRoute: ActivatedRoute
  ) { 
    this.iduser = this._usuarioService.getIdUser()
    this.ModeloPrestamos = new Prestamos("","","","","","","","","","","")
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idrutadocumento = dataRuta.get('iddocumento');
    });
    this.getSoloUnDocumento(this.idrutadocumento);
    this.getusuario();
  }

  getusuario(){
    this._usuarioService.getBuscarUnUsuarioId(this.iduser).subscribe(
      res => {
        this.carnet = res.carnet
      }
    )
  }

  getSoloUnDocumento(id: any){
    this._LibrosServices.getSoloUnDocumento(id).subscribe(
      res => {
        this.LibroEncontrado = res
        this.getUnPrestamo();
        if(this.LibroEncontrado.tipo == "Revistas"){
          this.bloqueportipo = true
        }else{
          this.bloqueportipo = false
        }
      }
    )
  }

  getUnPrestamo(){
    this._PrestamoServicio.getObtenerPrestamosPorUsuarioylibro(this.carnet, this.idrutadocumento).subscribe(
      res => {
        this.bloqueodebotones = false
        this.bloquedebotones2 = true
      }, error => {
        this.bloqueodebotones = true
        this.bloquedebotones2 = false
      }
    )
  }

  PutPrestarDocumento(){
    this.ModeloPrestamos.iduser = this.carnet
    this.ModeloPrestamos.idlibro = this.idrutadocumento

    this._PrestamoServicio.putPrestarLibro(this.ModeloPrestamos).subscribe(
      res =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El libro con el nombre de: '+this.LibroEncontrado.nombre+' del autor: '+this.LibroEncontrado.autor+' se a prestado correctamente',
          showConfirmButton: false,
          timer: 2000
        })
        this.getUnPrestamo();
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

  PutDeVolverLibro(){
    this.ModeloPrestamos.iduser = this.carnet
    this.ModeloPrestamos.idlibro = this.idrutadocumento

    this._PrestamoServicio.PutDevolverLibro(this.ModeloPrestamos).subscribe(
      res =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El libro con el nombre de: '+this.LibroEncontrado.nombre+' del autor: '+this.LibroEncontrado.autor+' se a devuelto correctamente',
          showConfirmButton: false,
          timer: 2000
        })
        this.getUnPrestamo()
      }, error => {
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
