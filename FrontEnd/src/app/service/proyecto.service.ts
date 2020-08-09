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

//   getPlanes()  {
//     return this.http.get(this.URL_API);
//   }

  getProject(id: String){
    return this.http.get(this.URL_API+'/show/'+id);
  }

  createProject(proyecto: any){
    return this.http.post(this.URL_API + '/create', proyecto);
  }

  editProject(proyecto: Proyectos){
    return this.http.put(this.URL_API + '/edit/' + `${proyecto._id}`, proyecto);
  }

  deleteProject(_id: string){
    return this.http.delete(this.URL_API + '/delete' + `${_id}`)
  }

}
