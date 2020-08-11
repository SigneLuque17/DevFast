import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CarpetaService } from '../../service/carpeta.service';

import { Router } from "@angular/router";


@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  // carpeta: any  = {};
  carpetas = [];
  snippets = [];
  proyectos = [];
  idUsuario:any = JSON.parse(localStorage.getItem("id"));
  carpetaPadre;

  constructor(private _carpetaService:CarpetaService, private activatedRoute: ActivatedRoute, private _router: Router) { 
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
}
