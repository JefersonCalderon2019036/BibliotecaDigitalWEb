import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prestamos } from 'src/app/modelos/prestamos.module';
import { Usuario } from 'src/app/modelos/usuario.module';
import { PrestamoServicio } from 'src/app/servicios/prestamos.servicios';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.scss'],
  providers: [UsuarioService, PrestamoServicio]
})
export class MiperfilComponent implements OnInit {
  id: any;
  MiPerfilDatos: any;
  bloqueoporrol: any;
  bloqueoporrol2: any;
  MisPrestamosDatos: any;
  bloqueprestamos: any;
  datos: any;
  ModeloUsuario: Usuario;

  constructor(
    public _usuarioService: UsuarioService,
    public _PrestamoServicio: PrestamoServicio,
    private _router: Router
  ) {
    this.id = this._usuarioService.getIdUser(),
    this.ModeloUsuario = new Usuario("","",0,"","","","","","",0)
   }

  ngOnInit(): void {
    this.datos = "Todos"
    this.MiPerfil(this.id)
  }

  MiPerfil(id: any){
    this._usuarioService.getBuscarUnUsuarioId(id).subscribe(
      res =>{
        this.MiPerfilDatos = res
        this.TodosMisPrestamos(this.MiPerfilDatos.carnet)
        if(this.MiPerfilDatos.rol = "admin"){
          this.bloqueoporrol = true
          this.bloqueoporrol2 = false
        }else{
          this.bloqueoporrol = false
          this.bloqueoporrol2 = true
        }
        
      }, error => {
        let textoerror = <any>error.error.mensaje
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: textoerror,
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }

  TodosMisPrestamos(id: any){

    if(this.datos == "Todos"){
      this._PrestamoServicio.GETHistorialDeUsuarios(id).subscribe(
        res =>{
          this.bloqueprestamos = true
          this.MisPrestamosDatos = res
        }, error => {
          this.bloqueprestamos = false
  
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: <any>error.error.mensaje,
            showConfirmButton: false,
            timer: 2000
          })
        }
      )
    }
    
    if(this.datos == "Devueltos"){
      this._PrestamoServicio.getObtenerPDPorUsuairo(id).subscribe(
        res =>{
          this.bloqueprestamos = true
          this.MisPrestamosDatos = res
        }, error => {
          this.bloqueprestamos = false
  
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: <any>error.error.mensaje,
            showConfirmButton: false,
            timer: 2000
          })
        }
      )
    }

    if(this.datos == "Prestados"){
      this._PrestamoServicio.getObtenerPrestamosPorUsuario(id).subscribe(
        res =>{
          this.bloqueprestamos = true
          this.MisPrestamosDatos = res
        }, error => {
          this.bloqueprestamos = false
  
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: <any>error.error.mensaje,
            showConfirmButton: false,
            timer: 2000
          })
        }
      )
    }
  }

  VerMasPrestamo(id: any){
    this._router.navigate(['/detallesprestamos',id+"/", this.MiPerfilDatos.carnet])
  }
}
