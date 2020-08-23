import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @Input() language:string;
  @Input() code:string;

  @Output() codeNew = new EventEmitter<string>()

  editorOptions = {};
  originalLenguage = '';
  // code: string= '';


  constructor() { 
  }


  ngOnInit(){
    console.log(this.language);
    this.originalLenguage = this.language;
    this.editorOptions = {theme: 'vs-dark', language: this.language};
    // this.code = '';
    // this.code;
  }

  actualizaCodigo(){
    if (this.originalLenguage !== this.language) {
      this.editorOptions = {language: this.language};
      this.originalLenguage = this.language;
    }
    this.codeNew.emit(this.code);

  }
}
