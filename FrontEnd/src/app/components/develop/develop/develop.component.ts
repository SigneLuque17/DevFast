import { Component, OnInit, ViewChild } from '@angular/core';
import { EditorComponent} from '../../editor/editor.component'

@Component({
  selector: 'app-develop',
  templateUrl: './develop.component.html',
  styleUrls: ['./develop.component.css']
})
export class DevelopComponent implements OnInit {
  javascript = 'javascript';
  html = 'html';
  css = 'css';
  constructor(
    
  ) { }

  ngOnInit(): void {
  }

}
