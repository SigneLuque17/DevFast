import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { UsuarioService } from "../../service/usuario.service";




@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {

  formularioRegistro:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),
    passVerified: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8)])
  });
  constructor() { }

  ngOnInit(): void {
  }

  registrarse(){
    console.log(this.formularioRegistro.value);
    console.log(this.formularioRegistro.get('nombre').value);


    if (this.formularioRegistro.get('nombre').valid &&
        this.formularioRegistro.get('email').valid &&
        this.formularioRegistro.get('password').valid &&
        this.formularioRegistro.get('passVerified').valid 
    ){ 

       
      console.log('valido');
      sessionStorage.setItem("usuario", JSON.stringify(this.formularioRegistro.value));
    }


  }
  
  validation(campo){
    return this.formularioRegistro.get(campo).invalid && this.formularioRegistro.get(campo).touched;
  }
}
