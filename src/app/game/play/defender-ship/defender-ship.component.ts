import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-defender-ship',
  templateUrl: './defender-ship.component.html',
  styleUrls: ['./defender-ship.component.css'],
  animations: [
    trigger('defenderShip', [
      state(
        'stepLeft',
        style({
          transform: 'translateX(-200px)',
        })
      ),
      state(
        'stepRight',
        style({
          transform: `translateX( 200px)`,
        })
      ),
      transition('* <=> *', animate(300)),
      // transition('* => stepRight', animate(300)),
    ]),
  ],
})
export class DefenderShipComponent implements OnInit, AfterViewInit {
  @ViewChild('ship') ship: ElementRef;
  playFieldHeight: number;
  state = 'idle';
  height = 100;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.code === 'ArrowRight') {
      this.onArrowRight();
      // this.state = 'idle';
    }

    if (event.code === 'ArrowLeft') {
      this.onArrowLeft();
    }
  }

  ngOnInit(): void {
    // console.log(this.ship.nativeElement.client);
  }

  ngAfterViewInit() {
    console.log(this.ship.nativeElement.offsetWidth);
  }

  onArrowLeft() {
    console.log('arrow left clicked');
    this.state = 'stepLeft';
  }

  onArrowRight() {
    console.log('arrow right clicked');
    this.state = 'stepRight';
  }
}
