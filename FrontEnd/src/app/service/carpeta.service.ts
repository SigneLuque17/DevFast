import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Carpetas } from '../model/carpetas';
import { CrearCuentaComponent } from '../components/crear-cuenta/crear-cuenta.component';


@Injectable({
  providedIn: 'root'
})
export class CarpetaService {

    selectedCarpetas: Carpetas;


  readonly URL_API = 'http://localhost:3000/api/carpeta'
  carpetas: Carpetas[];


  constructor( private http:HttpClient) { //encargado de hacer las peticiones del lado del cliente, asincronas
    this.selectedCarpetas = new Carpetas();
  }

  getArchivos( idUsuario:string, idCarpeta:string = '' )  {
    return this.http.post(this.URL_API, {id_usuario: idUsuario, id_carpeta:idCarpeta});
  }

  getCarpeta(id: String){
    return this.http.get(this.URL_API+'/show/'+id);
  }

  createCarpeta(carpeta: any){
    return this.http.post(this.URL_API + '/create', carpeta);
  }

  editCarpeta(carpeta: Carpetas){
    return this.http.put(this.URL_API + '/edit/' + `${carpeta._id}`, carpeta);
  }

  deleteCarpeta(_id: string){
    return this.http.delete(this.URL_API + '/delete' + `${_id}`)
  }

}
