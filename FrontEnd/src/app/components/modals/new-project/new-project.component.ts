import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ProyectoService } from '../../../service/proyecto.service';
import { CarpetaService } from '../../../service/carpeta.service';
import { SnippetService } from '../../../service/snippet.service';
import { UsuarioService } from "../../../service/usuario.service";
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('closeAddExpenseModal2') closeAddExpenseModal2: ElementRef;
  @ViewChild('closeAddExpenseModal3') closeAddExpenseModal3: ElementRef;

  @Output() evento = new EventEmitter<Elemento>();
  newElement:Elemento;
  hideTextProyecto: boolean;
  hideTextCarpeta: boolean;
  hideTextSnippet: boolean;

  correo:any = JSON.parse(sessionStorage.getItem("correo"));
  idUsuario:any = JSON.parse(sessionStorage.getItem("id"));
  idCarpetaPadre:any = "";
  fechaCreado;
  cantidadProyectos;
  cantidadSnippets;
  plan;
//validacion cantidad de archivos
permisoProyecto:boolean = true;
permisoSnippet:boolean = true;
tipo_archivo;
//modales
  showModalProyecto: boolean = false;
  showModalCarpeta: boolean = false;
  showModalSnippet: boolean = false;
  

  formularioProyecto:FormGroup = new FormGroup({
    nombre_proyecto: new FormControl('', [Validators.required])
  });

  formularioCarpeta:FormGroup = new FormGroup({
    nombre_carpeta: new FormControl('', [Validators.required])
  });

  formularioSnippet:FormGroup = new FormGroup({
    nombre_snippet: new FormControl('', [Validators.required])
  });

  constructor(private _proyectoService: ProyectoService, private _carpetaService: CarpetaService,private _snippetService: SnippetService,private _usuarioService: UsuarioService, private activatedRoute: ActivatedRoute) { 
        this.idUsuario = JSON.parse(sessionStorage.getItem("id"));
        this.hideTextProyecto = true;
        this.hideTextCarpeta = true;
        this.hideTextSnippet = true;

        this._usuarioService.getUser(this.correo)
        .subscribe((res:any) => {
          this.cantidadProyectos=res.user.proyectos.length;
          this.cantidadSnippets=res.user.snippets.length;
          this.plan = res.plan;
          
        });

  }

  ngOnInit(): void {
  }

  showModalCreateProject(){
    this.showModalProyecto = true;
    this.tipo_archivo = "proyecto";
    console.log(this.tipo_archivo);
    this.validarCantidad();
    
  }

  showModalCreateFolder(){
    this.showModalCarpeta = true;
  }

  showModalCreateSnippet(){
    this.showModalSnippet = true;
    this.tipo_archivo = "snippet";
    console.log(this.tipo_archivo);
    console.log("snippet");
    
    this.validarCantidad();

  }

  createProject(){
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      if(params['id']==undefined){
        this.idCarpetaPadre = "";
      } else {
      this.idCarpetaPadre = params['id'];
      }
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'longDate');
    const myFormattedDate2 = pipe.transform(now, 'short');

    this.fechaCreado=myFormattedDate;

    if (this.formularioProyecto.get('nombre_proyecto').valid) {
      let datos = {
        'nombre_proyecto':this.formularioProyecto.get("nombre_proyecto").value,
        'fecha_creacion':myFormattedDate,
        'carpeta_padre':this.idCarpetaPadre,
        'ultima_modificacion':myFormattedDate2,
        'codigo_HTML':"",
        'codigo_CSS':"",
        'codigo_JS':""

      }

      this._proyectoService.createProject(this.idUsuario, datos)
          .subscribe((res:any) => {
            console.log(res);

            this.newElement = {
              tipo:'proyecto',
              proyecto: res.req.proyecto
            };
            this.evento.emit(this.newElement);
            // this.idUsuario = res.id;

            this.closeAddExpenseModal.nativeElement.click();
            this.showModalProyecto=false;
            this.formularioProyecto.reset();

          });
    }
  });

  }

  createFolder(){
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      if(params['id']==undefined){
        this.idCarpetaPadre = "";
      } else {
      this.idCarpetaPadre = params['id'];
      }
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'longDate');
    this.fechaCreado=myFormattedDate;

    if (this.formularioCarpeta.get('nombre_carpeta').valid) {
      let datos = {
        'nombre_carpeta':this.formularioCarpeta.get("nombre_carpeta").value,
        'fecha_creacion':myFormattedDate,
        'carpeta_padre':this.idCarpetaPadre
      }

      this._carpetaService.createCarpeta(this.idUsuario, datos)
          .subscribe((res:any) => {
            console.log(res);

            this.newElement = {
              tipo:'carpeta',
              carpeta: res.req.carpeta
            };

            this.evento.emit(this.newElement);


            this.idCarpetaPadre = res.carpeta_padre;

            this.closeAddExpenseModal2.nativeElement.click();
            this.showModalCarpeta=false;
            this.formularioCarpeta.reset();

          });
    }
  });
  }

  createSnippet(){
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      if(params['id']==undefined){
        this.idCarpetaPadre = "";
      } else {
      this.idCarpetaPadre = params['id'];
      }
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'longDate');
    const myFormattedDate2 = pipe.transform(now, 'short');
    this.fechaCreado=myFormattedDate;


    if (this.formularioSnippet.get('nombre_snippet').valid) {
      let datos = {
        'nombre_snippet':this.formularioSnippet.get("nombre_snippet").value,
        'fecha_creacion':myFormattedDate,
        'ultima_modificacion':myFormattedDate2,
        'codigo':"",
        'carpeta_padre':this.idCarpetaPadre,
        'lenguaje': "javascript",
        'extension': "js"
      }

      this._snippetService.createSnippet(this.idUsuario, datos)
          .subscribe((res:any) => {
            this.newElement = {
              tipo:'snippet',
              snippet: res.req.snippet
            };

            this.evento.emit(this.newElement);

            this.closeAddExpenseModal3.nativeElement.click();
            this.showModalSnippet=false;
            this.formularioSnippet.reset();

          });
         
    }
  });
  }

  validarCantidad(){
    switch (this.tipo_archivo) {
      case "proyecto":
                      if (this.cantidadProyectos < this.plan.cantidad_proyectos) {
                        this.permisoProyecto=true;
                        console.log("Permitido");
                        console.log(this.plan.cantidad_proyectos -this.cantidadProyectos);
                        
                      }else {
                        this.permisoProyecto=false;
                        console.log("Ya no puede crear más proyectos");
                      }
        break;
      case "snippet":
                      if (this.cantidadSnippets < this.plan.cantidad_snippets) {
                        this.permisoSnippet=true;
                        console.log("Permitido");
                        console.log(this.plan.cantidad_snippets -this.cantidadSnippets);
                      }else {
                        this.permisoSnippet=false;
                        console.log("Ya no puede crear más snippets");
                      }
      
        break;
      default:
        break;
    }
  }

}


interface Elemento {
  tipo: string,
  carpeta?: Carpeta,
  snippet?: Snippet,
  proyecto?: Proyecto
}

interface Carpeta {
  _id:string,
  nombre_carpeta:string,
  fecha_creacion:string,
  carpeta_padre:string
}

interface Snippet {
  _id: string,
  nombre_snippet: string,
  fecha_creacion: string,
  ultima_modificacion: string,
  codigo: string,
  carpeta_padre: string,
}

interface Proyecto {
  _id:string,
  nombre_proyecto:string,
  fecha_creacion:string,
  carpeta_padre:string,
  ultima_modificacion:string,
  codigo_HTML:string,
  codigo_CSS:string,
  codigo_JS:string
}