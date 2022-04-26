import { Component, OnInit, Input } from '@angular/core';
import { eGameMode } from './game-mode.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  gameMode = eGameMode.welcome;

  constructor() {}

  ngOnInit(): void {}

  onPlayMode() {
    this.gameMode = eGameMode.play;
  }

  onGameModeChanged(newGameMode: eGameMode): void {
    this.gameMode = newGameMode;
  }
}
