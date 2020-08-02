import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  gameMode = 'play';
  // welcome, play, lost, won

  constructor() {}

  ngOnInit(): void {}

  onPlayMode() {
    this.gameMode = 'play';
  }
}
