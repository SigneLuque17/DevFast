import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from "../../service/usuario.service";
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  correo:any = JSON.parse(localStorage.getItem("correo"));
  nombreUsuario;
  tipoPlan;
  cantidadProyectos;
  cantidadSnippets;
  //modales
  modalPass;  //id
  showModalPass: boolean = false;
  //formulario
  cambiarContrasena:FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),
    newPassword: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),
    confirmNewPassword: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),

  });


  constructor(private _usuarioService: UsuarioService) { 
    this._usuarioService.getUser(this.correo)
        .subscribe((res:any) => {
          this.nombreUsuario=res.user.nombre;
          this.tipoPlan=res.user.tipo_plan;
          this.cantidadProyectos=res.user.cantidad_proyectos;
          this.cantidadSnippets=res.user.cantidad_snippets;
    });
  }

  ngOnInit(): void {
  }

  cambiarPassword(){
    if (this.cambiarContrasena.get('oldPassword').valid &&
    this.cambiarContrasena.get('newPassword').valid &&
    this.cambiarContrasena.get('confirmNewPassword').valid 
    ){ 
      console.log(this.cambiarContrasena.value);
      console.log('valido');
    }
    this.closeAddExpenseModal.nativeElement.click();
    this.showModalPass=false;
    this.cambiarContrasena.reset();
  }

  validation(campo){
    return this.cambiarContrasena.get(campo).invalid && this.cambiarContrasena.get(campo).touched;
  }

}
