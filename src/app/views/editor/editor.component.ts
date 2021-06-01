import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'c'};
  code: string= `#include <stdio.h>

int main (int arc,char*  argv)
{
    printf("Bonjour\\n");
    return 0;
}`;

  constructor() { }

  ngOnInit(): void {
  }

}
