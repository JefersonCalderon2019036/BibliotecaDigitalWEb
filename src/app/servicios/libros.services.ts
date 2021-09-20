import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libros } from '../modelos/libros.module';
import { GLOBALSERVICIOS } from './globalservicios';

@Injectable({
  providedIn: 'root'
})
export class LibrosServices {
  public url: String;
  public token: any;
  public identidad: any;
  public Encabezado = new HttpHeaders().set('Content-Type','application/json')
  public EncabezadoToken = this.Encabezado.set('Authorization', this.getToken());

  constructor(public _http: HttpClient) { 
    this.url = GLOBALSERVICIOS.url;
  }

    //funcion para obtner los libros mas vistos
    getlibrosmasvistos():Observable<any>{
        return this._http.get(this.url+"ObtenerDocumentosMasVistos",{headers: this.EncabezadoToken})
    }

    //funcion para obtener libros con palabras clave
    getBusquedaPorPalabrasClave(datos: Libros): Observable<any>{
      let params = JSON.stringify(datos);
      return this._http.put(this.url+"buscarporpalabrasclavesLibros",params, {headers: this.EncabezadoToken})
    }
    
    //funcion para obtener todos los libros
    getTodosLosLibros(): Observable<any>{
      return this._http.get(this.url+"ObtenerTodosLosLibros",{headers: this.EncabezadoToken})
    }

    getTodasLasRevistas(): Observable<any>{
      return this._http.get(this.url+"ObtenerTodasLasRevistas", {headers: this.EncabezadoToken})
    }

    //funcion para obtener un solo docuemento
    getSoloUnDocumento(id: any): Observable<any>{
      return this._http.get(this.url+"ObtenerUnSoloLibro/"+id, {headers: this.EncabezadoToken})
    }

    //funcion para agregar un nuevo libro
    postAgregarUnNuevoLibro(datos: Libros): Observable<any>{
      let params = JSON.stringify(datos);
      return this._http.post(this.url+"AgregarUnNuevoLibro/"+this.getIdUser(), params, {headers: this.EncabezadoToken})
    }

    //funcion para eliminar un libro
    DeleteUnLibro(id: any): Observable<any>{
      return this._http.delete(this.url+"ELiminarUnLibro/"+this.getIdUser()+"/"+id, {headers: this.EncabezadoToken})
    }

    //funcion para editar un libros
    PutEdtarUnLibro(id: any, datos: Libros): Observable<any>{
      let params = JSON.stringify(datos);
      return this._http.put(this.url+"EditarLibros/"+this.getIdUser()+"/"+id, params, {headers: this.EncabezadoToken})
    }

    GetObtenerTodoLosDocumentos():Observable<any>{
      return this._http.get(this.url+"ObtenerTodoLosDocumentos", {headers: this.EncabezadoToken})
    }

    //funcion para obtener el token
    getToken(){
        var token2 = localStorage.getItem('token');
        if(token2 != 'undefined'){
        this.token = token2;
        }else{
        this.token = null;
        }
        return this.token;
    }

    //funcion para obtener el username
  getIdUser(){
    var identidad2 = localStorage.getItem('iduser');
    if(identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad = null;
    }
    return this.identidad;
  }
}