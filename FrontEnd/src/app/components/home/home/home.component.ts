import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CarpetaService } from '../../../service/carpeta.service';
import { ProyectoService } from '../../../service/proyecto.service';
import { SnippetService } from '../../../service/snippet.service';
import { Router } from "@angular/router";
// import { EditorComponent} from '../../editor/editor.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('closeAddExpenseModal1') closeAddExpenseModal1: ElementRef;
  @ViewChild('closeAddExpenseModal2') closeAddExpenseModal2: ElementRef;

                                                        //reutiizar componente
  carpetas = [];
  snippets = [];
  proyectos = [];
  idUsuario:any = JSON.parse(localStorage.getItem("id"));
  //gestion de datos de proyecto
  proyecto;
  //gestion datos de snippet
  snippet;
  nombreSnippet;
  ultimaMod;
  codigoSnippet = '';
  lenguaje = 'javascript';
  //ids
  idProyecto;
  idSnippet;
  idCarpeta;
  tipoArchivo: any = "";
  //modales
  modalEditar;
  modalEliminar;
  modalSnippet;
  showModalEditar: boolean = false;
  showModalEliminar: boolean = false;
  showModalSnippet: boolean = false;
  //formulario
  cambiarNombre:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  });

  constructor(private _carpetaService:CarpetaService,private _proyectoService:ProyectoService,private _snippetService:SnippetService, private _router: Router) { 
  this.idUsuario = JSON.parse(localStorage.getItem("id"));

    this._carpetaService.getArchivos( this.idUsuario )
      .subscribe( (res:any) => {
        this.carpetas = res.carpetas;
        this.snippets = res.snippets;
        this.proyectos = res.proyectos;
      } );

      

  }

  ngOnInit(): void {

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
      case "snippet":
                      this.idSnippet=id;
                      this._snippetService.getSnippet(this.idUsuario, id)
                        .subscribe( (res:any) => {
                          this.snippet = res.snippet;
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
      case "snippet":
                      this.idSnippet=id;
      break;

      default:
        break;
    }
    this.tipoArchivo = tipoArchivo;

  }
  showModalModifySnippet(id){
    console.log(id);
    this.idSnippet=id;
    this._snippetService.getSnippet(this.idUsuario, id)
      .subscribe( (res:any) => {
        this.nombreSnippet = res.snippet.nombre_snippet;
        this.ultimaMod = res.snippet.ultima_modificacion;
        this.codigoSnippet = res.snippet.codigo;
      });

    this.showModalSnippet = true;
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
        case "snippet":
                      let snippet = {
                        nombre_snippet: this.cambiarNombre.get('nombre').value,
                        ultima_modificacion: this.snippet.ultima_modificacion,
                        codigo: this.snippet.codigo
                      }
                      console.log(snippet);
                      
                      this._snippetService.editSnippet(this.idUsuario, this.idSnippet, snippet)
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
                      this._snippetService.deleteSnippet(this.idUsuario, this.idSnippet)
                      .subscribe( (res:any) => {
                        console.log(res.status);
                      });
                      this.closeAddExpenseModal1.nativeElement.click();
                      this.showModalEliminar=false;
          break;

        default:
          break;
      } 
  }

  guardarCodigoSnippet(){
    console.log(this.idSnippet);
    
  }

  actualizaCodigo(event){
        this.codigoSnippet = event;
        console.log(event);
  }

}
