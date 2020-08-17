import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from "../../service/usuario.service";
import { NgForm }    from "@angular/forms";
import { Router } from "@angular/router";



@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  usuario:any = JSON.parse(localStorage.getItem("usuario"));
  showModal: boolean = false;
  planes: any = [];
  planSelected:string ='';
  proyectos: any = [];
  snippets:any = [];
  carpetas:any=[];
  idUsuario;



  constructor(private _usuarioService: UsuarioService, private _router: Router) { }

  ngOnInit(){

    this._usuarioService.getPlanes().subscribe(res =>{
      this.planes = res;
      console.log(this.planes);
    })
  }

  tipoPlan(tipo){
    console.log(tipo);
    this.planSelected = tipo;
    if(0){
      // Dont open the modal
      this.showModal = false;
    } else {
       // Open the modal
       this.showModal = true;
    }
  }

  addUser() {
    console.log(this.usuario.nombre);
    console.log(this.planSelected);

    let datos = new FormData();

    datos.set('nombre', this.usuario.nombre);
    datos.set('correo', this.usuario.email);
    datos.set('contrasena', this.usuario.password);
    datos.set('perfil', '');
    datos.set('plan', this.planSelected);


    console.log(datos);
  

    this._usuarioService.createUser(datos)
        .subscribe((res:any) => {
          console.log(res);
          this.idUsuario = res.id;
          localStorage.clear();
          this.closeAddExpenseModal.nativeElement.click();
          this.showModal=false;
          localStorage.setItem("id", JSON.stringify(this.idUsuario));
          localStorage.setItem("correo", JSON.stringify(this.usuario.email));

        });
  }

  // eliminarData(){
  //   localStorage.clear();
  // }




}
