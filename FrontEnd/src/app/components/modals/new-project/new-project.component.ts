import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  showModal: boolean = false;
  formularioProyecto:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  showModalCreate(){
    this.showModal = true;
  }

  createProject(){
    if (this.formularioProyecto.get('nombre').valid) {
      console.log(this.formularioProyecto.get('nombre').value);
      
      this.closeAddExpenseModal.nativeElement.click();
      this.showModal=false;
    }
    
  }
}
