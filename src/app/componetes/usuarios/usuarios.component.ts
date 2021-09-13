import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.module';
import { PrestamoServicio } from 'src/app/servicios/prestamos.servicios';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService, PrestamoServicio]
})
export class UsuariosComponent implements OnInit {
  ModeloUsuario: Usuario;
  ListaDeUsuariosAsc: any;
  opcionSeleccionado: any;
  bloquedeverdatos: any;
  ListaDeUsuarioDes: any;
  bloquededatos2: any;
  archivoInput: any;
  porcentajeArchivo: any;
  imagenUrl: any;
  datosvermas: any;
  idMiUser: any;
  datosprestamosuser: any;
  bloqueoporbusqueda: any;
  busquedauser: any;

  constructor(
    private _usuarioService: UsuarioService,
    private _PrestamoServicio: PrestamoServicio,
    private _router: Router
  ) {
    this.ModeloUsuario = new Usuario("","",0,"","","","","","",0),
    this.idMiUser = this._usuarioService.getIdUser();
   }

  ngOnInit(): void {
    this.opcionSeleccionado = 1
    this.ModeloUsuario.rol = "estudiante"
    this.capturar()
    this.getUsuariosAscendentes()
    this.VerMas(this.idMiUser)
    this.bloqueoporbusqueda = false
  }

  getUsuariosAscendentes(){
    this.bloquedeverdatos = false
    this.bloquededatos2 = true
    this.bloqueoporbusqueda = false
    this._usuarioService.getUsuariosAdminASC().subscribe(
      res => {
        this.ListaDeUsuariosAsc = res
      }, error => {
        console.log(<any>error)
        let textoerror = <any>error.mensaje
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: textoerror
          })
      }
    )
  }

  getUsuariosDescendentes(){
    this.bloquedeverdatos = true
    this.bloquededatos2 = false
    this.bloqueoporbusqueda = false
    this._usuarioService.getUsuariosAdminDESC().subscribe(
      res => {
        this.ListaDeUsuarioDes = res
      }, error => {
        let textoerror = <any>error.mensaje
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: textoerror
          })
      }
    )
  }

  capturar(){
    if(this.opcionSeleccionado == 1){
      this.getUsuariosAscendentes()
    }else{
      this.getUsuariosDescendentes()
    }
  }

  Buscar(){
    if(this.ModeloUsuario.carnet == 0){
      this.getUsuariosAscendentes()
    } else {
      this.bloqueoporbusqueda = true
      this.bloquedeverdatos = false
    this.bloquededatos2 = false
      this._usuarioService.getBusquedaDeUsuarioPorCarnet(this.ModeloUsuario).subscribe(
        res => {
          this.busquedauser = res
        }, error =>{
          let textoerror = <any>error.mensaje
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: textoerror
          })
        }
      )
    }
  }

  AgregarUnUsuario(){
      this._usuarioService.postAgregarUnUsuario(this.ModeloUsuario).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Su usuario con el nombre de '+this.ModeloUsuario.nombre+" "+this.ModeloUsuario.apellido+" se a creado correctamente.",
            showConfirmButton: false,
            timer: 1500
          })
          this.getUsuariosAscendentes()
        }, error => {
          let textoerror = <any>error.mensaje
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: textoerror
          })
        }
      )
    
  }

  VerMas(id: any){
    this._usuarioService.getBuscarUnUsuarioId(id).subscribe(
      res => {
        this.datosvermas = res
        this.ModeloUsuario = res
        this.HistorialDePrestamos(id)
      }, error => {
        let textoerror = <any>error.mensaje
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: textoerror
          })
      }
    )
  }

  HistorialDePrestamos(id: any){
    this._PrestamoServicio.getObtenerPrestamosPorUsuario(id).subscribe(
      res =>{
        this.datosprestamosuser = res
      }, error => {
        let textoerror = <any>error.mensaje
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: textoerror,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  EliminarUsuario(id: any){
    Swal.fire({
      title: '¿Eliminar?',
      text: "Seguro que desea eliminar este usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, quiero eliminarlo',
      confirmButtonText: 'Si, quiero eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.deleteEliminarUsuariosComoAdmin(id).subscribe(
          res =>{
            let texto = res.mensaje
            Swal.fire(
              'Eliminar!',
               texto,
              'success'
            )
            this.getUsuariosAscendentes()
          }
        )
      }
    })
  }

  EditarUsuario(){
    this._usuarioService.putEditarUnUsuarioComoAdministrado(this.ModeloUsuario, this.ModeloUsuario._id).subscribe(
      res =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Su usuario con el carnet: '+res.carnet+' a sido actualizado correctamente por un administrador.',
          showConfirmButton: false,
          timer: 2000
        })
      }, error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: <any>error.mensaje,
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }
}

