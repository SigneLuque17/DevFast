import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Proyectos } from '../model/proyectos';
import { CrearCuentaComponent } from '../components/crear-cuenta/crear-cuenta.component';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  selectedProyectos: Proyectos;


  readonly URL_API = 'http://localhost:3000/api/proyecto'
  proyectos: Proyectos[];


  constructor( private http:HttpClient) { //encargado de hacer las peticiones del lado del cliente, asincronas
    this.selectedProyectos = new Proyectos();
  }

  getProject(idUsuario: String, idProyecto:String){
    return this.http.post(this.URL_API+'/show', {id_usuario: idUsuario, id_proyecto:idProyecto});
  }

  createProject(idUsuario: String, proyecto:any){
    return this.http.post(this.URL_API + '/create-project', {id_usuario: idUsuario, proyecto:proyecto});
  }

  editProject(idUsuario: String, idProyecto:String, proyectoUpdated:any){//Crear un modelo de proyecto
    return this.http.put(this.URL_API + '/edit-project/' + idUsuario + '/' + idProyecto, proyectoUpdated);
  }

  deleteProject(idUsuario: String, idProyecto:String){
    return this.http.delete(this.URL_API + '/delete-project/' + idUsuario + '/' + idProyecto)
  }

}
