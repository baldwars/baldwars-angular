import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EngineService} from "./engine.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  rendererCanvas?: ElementRef<HTMLCanvasElement>;

  constructor(private engServ: EngineService) { }

  ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas!);
    this.engServ.animate();
  }

}
