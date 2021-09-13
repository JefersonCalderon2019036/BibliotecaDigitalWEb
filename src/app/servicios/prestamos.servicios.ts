import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBALSERVICIOS } from './globalservicios';

@Injectable({
  providedIn: 'root'
})
export class PrestamoServicio {
    public url: String;
    public token: any;
    public identidad: any;
    public Encabezado = new HttpHeaders().set('Content-Type','application/json')
    public EncabezadoToken = this.Encabezado.set('Authorization', this.getToken());

    constructor(public _http: HttpClient) { 
        this.url = GLOBALSERVICIOS.url;
    }

    getObtenerPrestamosPorUsuario(id: any): Observable<any>{
        return this._http.get(this.url+"ObtenerPrestamosPorUsuario/"+id, {headers: this.EncabezadoToken})
    }

    putPrestarLibros(id: any): Observable<any>{
        return this._http.get(this.url+"PrestarLibros/"+this.getIdUser()+"/"+id, {headers: this.EncabezadoToken})
    }

    getObtenerPrestamosPorUsuarioylibro(id: any): Observable<any>{
        return this._http.get(this.url+"ObtenerPrestamoPorUsuarioyLibro/"+this.getIdUser()+"/"+id, {headers: this.EncabezadoToken})
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