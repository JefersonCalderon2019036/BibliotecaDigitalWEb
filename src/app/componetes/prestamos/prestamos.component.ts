import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prestamos } from 'src/app/modelos/prestamos.module';
import { LibrosServices } from 'src/app/servicios/libros.services';
import { PrestamoServicio } from 'src/app/servicios/prestamos.servicios';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss'],
  providers: [PrestamoServicio, UsuarioService, LibrosServices]
})
export class PrestamosComponent implements OnInit {
  DatosPrestamosActivosASC: any;
  DatoTodosLosPrestamos: any;
  BloqueoPrestamosDES: any;
  BloqueoPrestamosTodos: any;
  opcionSeleccionado: any;
  BloqueoPrestamosInactivos: any;
  DatosPrestamosDevueltos: any;
  datosusuario: any;
  datosdocumentos: any;
  ModeloPrestamos: Prestamos;
  datosusuarioprestamo: any;
  BloqueBusquedaUsuarioPrestamos: any;
  datofijo: any;

  constructor(
    public _PrestamoServicio: PrestamoServicio,
    public _LibrosServices: LibrosServices,
    public _UsuarioService: UsuarioService,
    public _router: Router
  ) { 
    this.ModeloPrestamos = new Prestamos("","","","","","","","","","","")
  }

  ngOnInit(): void {
    this.opcionSeleccionado = "Todos"
    this.ModeloPrestamos.iduser = "No filtrar"
    this.ModeloPrestamos.estado == "Todos"
    this.capturar()
    this.GetTodosLosUsuario()
  }

  capturar(){
    if(this.opcionSeleccionado == "Todos"){
      this.GetTodosLosPrestamos()
    }else{
      if(this.opcionSeleccionado == "Prestados"){
        this.GesTodosLosPrestamosDesc()
      }else{
        this.GetObtenerPrestamosInactivosDescendentes()
      }
    }
  }

  GesTodosLosPrestamosDesc(){
    this.BloqueoPrestamosDES = true
    this.BloqueoPrestamosTodos = false
    this.BloqueoPrestamosInactivos = false 
    this.BloqueBusquedaUsuarioPrestamos = false

    this._PrestamoServicio.GetObtenerPrestamosActivosDescendentes().subscribe(
      res =>{
        this.DatosPrestamosActivosASC = res
      }, error => {
        console.log(<any>error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: <any>error.error.mensaje
        })
      }
    )
  }

  GetTodosLosPrestamos(){
    this.BloqueoPrestamosDES = false
    this.BloqueoPrestamosTodos = true
    this.BloqueoPrestamosInactivos = false 
    this.BloqueBusquedaUsuarioPrestamos = false

    this._PrestamoServicio.getTodosLosPrestamos().subscribe(
      res =>{
        this.DatoTodosLosPrestamos = res
      }, error => {
        console.log(<any>error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: <any>error.error.mensaje
        })
      }
    )
  }

  GetObtenerPrestamosInactivosDescendentes(){
    this.BloqueoPrestamosDES = false
    this.BloqueoPrestamosTodos = false
    this.BloqueoPrestamosInactivos = true
    this.BloqueBusquedaUsuarioPrestamos = false

    this._PrestamoServicio.GetObtenerPrestamosInactivosDescendentes().subscribe(
      res =>{
        this.DatosPrestamosDevueltos = res
      }, error => {
        console.log(<any>error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: <any>error.error.mensaje
        })
      }
    )
  }

  GetTodosLosUsuario(){
    this._UsuarioService.getUsuariosAdminASC().subscribe(
      res =>{
        this.datosusuario = res
      }, error => {
        console.log(<any>error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: <any>error.error.mensaje
        })
      }
    )
  }

  GetLibrosServices(){
    this._LibrosServices.GetObtenerTodoLosDocumentos().subscribe(
      res => {
        this.datosdocumentos = res
      }, error => {
        console.log(<any>error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: <any>error.error.mensaje
        })
      }
    )
  }

  PutPrestarDocumento(){
    this._PrestamoServicio.putPrestarLibro(this.ModeloPrestamos).subscribe(
      res =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El libro con el nombre de: '+res.nombre+' del autor: '+res.autor+' se a prestado correctamente',
          showConfirmButton: false,
          timer: 2000
        })
        this.capturar()
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

  BuscarPrestamosUsuario(){
    this.BloqueoPrestamosDES = false
    this.BloqueoPrestamosTodos = false
    this.BloqueoPrestamosInactivos = false
    this.BloqueBusquedaUsuarioPrestamos = true


    if(this.ModeloPrestamos.iduser == "No filtrar"){
      this.capturar()
    }

    if(this.ModeloPrestamos.estado == "Todos"){
        this._PrestamoServicio.GETHistorialDeUsuarios(this.ModeloPrestamos.iduser).subscribe(
          res => {
            this.datosusuarioprestamo = res
            console.log(res)
          },error => {
            let textoerror = <any>error.error.mensaje
            this.BloqueBusquedaUsuarioPrestamos = false
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: textoerror,
            })
          }
        )
    }

    if(this.ModeloPrestamos.estado == "Devueltos"){
        this._PrestamoServicio.getObtenerPDPorUsuairo(this.ModeloPrestamos.iduser).subscribe(
          res => {
            this.datosusuarioprestamo = res
            console.log(res)
          },error => {
            let textoerror = <any>error.error.mensaje
            this.BloqueBusquedaUsuarioPrestamos = false
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: textoerror,
            })
          }
        )
    }
      
    if(this.ModeloPrestamos.estado == "Prestados"){
        this._PrestamoServicio.getObtenerPrestamosPorUsuario(this.ModeloPrestamos.iduser).subscribe(
          res => {
            this.datosusuarioprestamo = res
          },error => {
            let textoerror = <any>error.error.mensaje
            this.BloqueBusquedaUsuarioPrestamos = false
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: textoerror,
            })
          }
        )
    }
  }

  VerMas(id: any, carnet: any){
    this._router.navigate(['/detallesprestamos',id+"/",carnet])
  }
}
