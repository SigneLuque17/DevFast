import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @Input() language:string;
  editorOptions = {};
  code: string= '';


  constructor() { 
  }


  ngOnInit(){
    console.log(this.language);
    this.editorOptions = {theme: 'vs-dark', language: this.language};
    this.code = '';
    // this.code;
  }
}
