import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i)]),
    password: new FormControl('', [Validators.required])
  });
  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.formularioLogin.value);
    
  }

  validation(campo){
    return this.formularioLogin.get(campo).invalid && this.formularioLogin.get(campo).touched;
  }
}
