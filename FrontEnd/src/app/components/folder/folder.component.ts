import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CarpetaService } from '../../service/carpeta.service';
import { ProyectoService } from '../../service/proyecto.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from "@angular/router";


@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  @ViewChild('closeAddExpenseModal1') closeAddExpenseModal1: ElementRef;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  // carpeta: any  = {};
  carpetas = [];
  snippets = [];
  proyectos = [];
  idUsuario:any = JSON.parse(localStorage.getItem("id"));
  //gestion de datos de proyecto
  proyecto;
  carpetaPadre;
  //ids
  idProyecto;
  idCarpeta;
  tipoArchivo: any = "";
  //modales
  modalEditar;
  modalEliminar;
  showModalEditar: boolean = false;
  showModalEliminar: boolean = false;
  //formulario
  cambiarNombre:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  });


  constructor(private _carpetaService:CarpetaService,private _proyectoService:ProyectoService, private activatedRoute: ActivatedRoute, private _router: Router) { 
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.carpetaPadre = params['nombre'];
      this._carpetaService.getArchivos( this.idUsuario, params['id'] )
      .subscribe( (res:any) => {
        this.carpetas = res.carpetas;
        this.snippets = res.snippets;
        this.proyectos = res.proyectos;
      } )
    });
  }

  ngOnInit(): void {
    console.log();
    
  }

  verCarpeta(nombre:string, id:String){
    console.log(id);
    this._router.navigate(['/folder', nombre, id]);
  }

  verProyecto(nombre:string, id:String){
    console.log(id);
    this._router.navigate(['/develop', nombre, id]);
  }
  showModalEdit(id, tipoArchivo){
    console.log(id);
    
    this.showModalEditar = true;
    switch (tipoArchivo) {
      case "carpeta":
        this.idCarpeta=id;
        break;
      case "proyecto":
        this.idProyecto=id;
        this._proyectoService.getProject(this.idUsuario, id)
      .subscribe( (res:any) => {
        this.proyecto = res.project;
      });

        break;

      default:
        break;
    }
    this.tipoArchivo = tipoArchivo;
  }
  showModalDelete(id, tipoArchivo){
    console.log(id);
    this.showModalEliminar = true;
    switch (tipoArchivo) {
      case "carpeta":
        this.idCarpeta=id;
        break;
      case "proyecto":
        this.idProyecto=id;
        break;

      default:
        break;
    }
    this.tipoArchivo = tipoArchivo;

  }
  editarNombre(){
    
    switch (this.tipoArchivo) {
      case "carpeta":
                    let carpeta = {
                      nombre_carpeta: this.cambiarNombre.get('nombre').value
                    }
                    console.log(carpeta);
                    
                    this._carpetaService.editCarpeta(this.idUsuario, this.idCarpeta, carpeta)
                    .subscribe( (res:any) => {
                      console.log(res.status);
                    });

                    this.closeAddExpenseModal.nativeElement.click();
                    this.showModalEditar=false;
                    this.cambiarNombre.reset();
        break;
      case "proyecto":
                    let proyecto = {
                          nombre_proyecto: this.cambiarNombre.get('nombre').value,
                          ultima_modificacion: this.proyecto.ultima_modificacion,
                          codigo_HTML: this.proyecto.codigo_HTML,
                          codigo_CSS: this.proyecto.codigo_CSS,
                          codigo_JS: this.proyecto.codigo_JS
                        }
                        console.log(proyecto);
                        
                        this._proyectoService.editProject(this.idUsuario, this.idProyecto, proyecto)
                          .subscribe( (res:any) => {
                            console.log(res.status);
                          });
                      
                      this.closeAddExpenseModal.nativeElement.click();
                      this.showModalEditar=false;
                      this.cambiarNombre.reset();
        break;
    
      default:
        break;
    }


  
}



  eliminar(){
    switch (this.tipoArchivo) { //me tiene que redirigir a la carpeta padre
      case "carpeta":
        this._carpetaService.deleteCarpeta(this.idUsuario, this.idCarpeta)
        .subscribe( (res:any) => {
          console.log(res.status);
        });
        this.closeAddExpenseModal1.nativeElement.click();
        this.showModalEliminar=false;
        
        break;
      case "proyecto":
        this._proyectoService.deleteProject(this.idUsuario, this.idProyecto)
        .subscribe( (res:any) => {
          console.log(res.status);
        });
        this.closeAddExpenseModal1.nativeElement.click();
        this.showModalEliminar=false;
        
        break;
      case "snippet":
          console.log("snippet");
          
        break;

      default:
        break;
    } 
}



}
