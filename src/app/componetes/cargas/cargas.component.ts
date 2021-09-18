import { Component, OnInit } from '@angular/core';
import { LibrosServices } from 'src/app/servicios/libros.services';
import { PrestamoServicio } from 'src/app/servicios/prestamos.servicios';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargas',
  templateUrl: './cargas.component.html',
  styleUrls: ['./cargas.component.scss'],
  providers: [UsuarioService,LibrosServices,PrestamoServicio]
})
export class CargasComponent implements OnInit {
  cargausuarios: any;
  bloquearcargasdeusuarios: any;
  bloquearcargasdelibros: any;
  bloquearcargasdelasrevistas: any;
  bloquearcargasdeprestaciones: any;
  cargalibros: any;
  cargarevistas: any;
  cargaprestamos: any;
  tipo: any;

  constructor(
    public _UsuarioService: UsuarioService,
    public _LibrosServices: LibrosServices,
    public _PrestamoServicio: PrestamoServicio
  ) { 
    this.tipo = "Revistas"
  }

  ngOnInit(): void {
    this.CargaMasibaDeUsuarios()
  }

  CargaMasibaDeUsuarios(){
    this.bloquearcargasdeusuarios = true
    this.bloquearcargasdelibros = false
    this.bloquearcargasdelasrevistas = false
    this.bloquearcargasdeprestaciones = false
    this._UsuarioService.getUsuariosAdminASC().subscribe(
      res => {
        this.cargausuarios = res
      },error =>{
        console.log(<any>error)
        let texto = <any>error.error.mensaje
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: texto,
        })
      }
    )
  }

  CargaMasibaDeLibros(){
    this.bloquearcargasdeusuarios = false
    this.bloquearcargasdelibros = true
    this.bloquearcargasdelasrevistas = false
    this.bloquearcargasdeprestaciones = false
    this._LibrosServices.getTodosLosLibros().subscribe(
      res=>{
        this.cargalibros = res
      },error =>{
        console.log(<any>error)
        let texto = <any>error.error.mensaje
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: texto,
        })
      }
    )
  }

  CargaMasibaDeRevistas(){
    this.bloquearcargasdeusuarios = false
    this.bloquearcargasdelibros = false
    this.bloquearcargasdelasrevistas = true
    this.bloquearcargasdeprestaciones = false
    this._LibrosServices.getTodasLasRevistas().subscribe(
      res => {
        this.cargarevistas = res
      },error =>{
        console.log(<any>error)
        let texto = <any>error.error.mensaje
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: texto,
        })
      }
    )
  }

  CargasMasibaDePrestamos(){
    this.bloquearcargasdeusuarios = false
    this.bloquearcargasdelibros = false
    this.bloquearcargasdelasrevistas = false
    this.bloquearcargasdeprestaciones = true
    this._PrestamoServicio.getTodosLosPrestamos().subscribe(
      res => {
        this.cargaprestamos = res
      },error =>{
        console.log(<any>error)
        let texto = <any>error.error.mensaje
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: texto,
        })
      }
    )

  }
}
