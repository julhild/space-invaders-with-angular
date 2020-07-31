import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css'],
})
export class GameInfoComponent implements OnInit {
  @Input() gameMode: string;

  @Output() playClick = new EventEmitter<void>();

  constructor() {}

  onClickPlay() {
    this.playClick.emit();
  }

  ngOnInit(): void {}
}
