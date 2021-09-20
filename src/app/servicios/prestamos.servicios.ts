import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestamos } from '../modelos/prestamos.module';
import { Usuario } from '../modelos/usuario.module';
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

    getObtenerPDPorUsuairo(id: any): Observable<any>{
        return this._http.get(this.url+"ObtenerPDPorUsuairo/"+id, {headers: this.EncabezadoToken})
    }

    GETHistorialDeUsuarios(datos: any): Observable<any>{
        return this._http.get(this.url+"HistorialDeUsuarios/"+datos, {headers: this.EncabezadoToken})
    }

    getObtenerPrestamosPorUsuarioylibro(iduser: any, idlibro: any): Observable<any>{
        return this._http.get(this.url+"ObtenerPrestamoPorUsuarioyLibro/"+iduser+"/"+idlibro, {headers: this.EncabezadoToken})
    }

    getUnSoloPrestamo(id: any): Observable<any>{
        return this._http.get(this.url+"ObtenerUnSoloPrestamo/"+id, {headers: this.EncabezadoToken})
    }

    getTodosLosPrestamos(): Observable<any>{
        return this._http.get(this.url+"ObtenerTodosLosPrestamos",{headers: this.EncabezadoToken})
    }

    putPrestarLibro(datos: Prestamos):Observable<any>{
        let params = JSON.stringify(datos);
        return this._http.put(this.url+"PrestarLibros", params, {headers: this.EncabezadoToken})
    }

    PutDevolverLibro(datos: Prestamos): Observable<any>{
        let params = JSON.stringify(datos);
        return this._http.put(this.url+"devolverlibro", params, {headers: this.EncabezadoToken})
    }

    GetObtenerPrestamosActivosDescendentes(): Observable<any>{
        return this._http.get(this.url+"ObtenerPrestamosActivosDescendentes/"+this.getIdUser(), {headers: this.EncabezadoToken})
    }

    GetObtenerPrestamosInactivosDescendentes():Observable<any>{
        return this._http.get(this.url+"ObtenerPrestamosInactivosDescendentes/"+this.getIdUser(), {headers: this.EncabezadoToken})
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