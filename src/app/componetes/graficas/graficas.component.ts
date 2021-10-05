import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Usuario } from 'src/app/modelos/usuario.module';
import { PrestamoServicio } from 'src/app/servicios/prestamos.servicios';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
  providers: [UsuarioService, PrestamoServicio]
})
export class GraficasComponent implements OnInit {
  datostableusuarios: any;
  bloqueograficasusuarios: any;
  bloqueotableusuario: any;
  ModeloUsuario: Usuario;

  chartOptions = {
    responsive: true,
  };
  chartLabels = [];
  chartData = [];
  chartColors = [{
    backgroundColor: ['#D32F2F', '#0288D1', '#4CAF50', '#03A9F4', '#00796B', '#8BC34A', '#FFEB3B', '#303F9F', '#3F51B5', '#FF5722', '#9E9E9E'],
  }];
  chartLegend = true;
  chartPlugins: [];
  contador: number;
  bloqueotabledocumentos: boolean;
  bloqueodocumentos: boolean;
  bloqueousuario: boolean;
  bloqueograficadocumentos: boolean;
  datostablelibros: any;

  constructor(
    public _PrestamoServicio: PrestamoServicio,
    public  _UsuarioService: UsuarioService
  ) { 
    this.ModeloUsuario = new Usuario("","",0,"","","","","","",0,0)
  }

  ngOnInit(): void {
    this.tableusuarioconprestaciones()
    this.tablalibrosprestaciones()
    this.bloqueodocumentos = false
    this.bloqueousuario = true
  }

  tableusuarioconprestaciones(){
    this.bloqueograficasusuarios = false
    this.bloqueotableusuario = true
    this.chartLabels = [];
    this.chartData = [];
    this._UsuarioService.getObtenerLosUsuairosConMasPrestaciones().subscribe(
      res => {
        this.datostableusuarios = res
      }, error => {
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

  graficausuarioprestaciones(){
    this.bloqueograficasusuarios = true
    this.bloqueotableusuario = false
    this._UsuarioService.getObtenerLosUsuairosConMasPrestaciones().subscribe(
      res => {
        this.datostableusuarios = res
        this.datostableusuarios.forEach(element => {
          this.chartLabels.push(element.nombre+" "+element.apellido)
          this.chartData.push(element.cantidaddedocuentosprestados)
        });
      }, error => {
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

  ImprimirUsuariosPrestaciones(){
    const doc = new jsPDF();
    autoTable(doc, { html: '#table-usuarios-prestaciones' })
    doc.save("Tabla de los usuarios con mas prestaciónes.pdf")
  }

  ImprimirLibrosPrestaciones(){
    const doc = new jsPDF();
    autoTable(doc, { html: '#table-libros-prestaciones' })
    doc.save("Tabla de los documentos con mas prestaciónes.pdf")
  }

  cambio(){
    if(this.bloqueodocumentos == false){
      this.bloqueodocumentos = true
      this.bloqueousuario = false
      this.tablalibrosprestaciones()
    }else{
      this.bloqueodocumentos = false
      this.bloqueousuario = true
      this.tableusuarioconprestaciones()
    }
  }

  tablalibrosprestaciones(){
    this.bloqueograficadocumentos = false
    this.bloqueotabledocumentos = true
    this.chartLabels = [];
    this.chartData = [];
    this._PrestamoServicio.getObtenerLosDocumentosMasPrestados().subscribe(
      res=>{
        this.datostablelibros = res
      }, error => {
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

  graficalibrosprestaciones(){
    this.bloqueograficadocumentos = true
    this.bloqueotabledocumentos = false
    this._PrestamoServicio.getObtenerLosDocumentosMasPrestados().subscribe(
      res=>{
        this.datostablelibros = res
        this.datostablelibros.forEach(element => {
          this.chartLabels.push(element.nombre+" ("+element.autor+")")
          this.chartData.push(element.cantidaddedocuentosprestados)
        });
      }, error => {
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
}
