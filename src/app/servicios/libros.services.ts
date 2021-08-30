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
}