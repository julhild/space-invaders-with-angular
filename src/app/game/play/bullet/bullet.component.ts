import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-bullet',
  templateUrl: './bullet.component.html',
  styleUrls: ['./bullet.component.css'],
  animations: [
    trigger('bullet', [
      transition('void => *', [
        style({ transform: 'translateY(650px)' }),
        animate(3000),
      ]),
    ]),
  ],
})
export class BulletComponent implements OnInit {
  @Input() positionX: number;

  bulletState = 'start';

  constructor() {}

  ngOnInit(): void {}
}
