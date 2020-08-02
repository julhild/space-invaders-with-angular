import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent implements OnInit {
  defenderPosition = 225;
  shootLastPressed = null;

  constructor() {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);

    if (event.code === 'ArrowRight') {
      this.onArrowRight();
      // this.state = 'idle';
    }

    if (event.code === 'ArrowLeft') {
      this.onArrowLeft();
    }

    if (event.code === 'Space') {
      this.onShoot();
    }
  }

  ngOnInit(): void {}

  onArrowLeft() {
    if (this.defenderPosition > 10) {
      this.defenderPosition -= 10;
    }
    return;
  }

  onArrowRight() {
    if (this.defenderPosition < 440) {
      this.defenderPosition += 10;
    }
    return;
  }

  onShoot() {
    const now = Date.now();
    if (now - this.shootLastPressed > 1000) {
      // create shoot component
      console.log('shoot');
      this.shootLastPressed = now;
    }
    return;
  }
}
