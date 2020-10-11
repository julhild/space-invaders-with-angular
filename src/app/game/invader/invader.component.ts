import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-invader',
  templateUrl: './invader.component.html',
  styleUrls: ['./invader.component.css'],
  animations: [
    trigger('invader', [
      state('invisible', style({ opacity: '0', visibility: 'hidden' })),
      state('visible', style({ opacity: '1', visibility: 'visible' })),
      transition('invisible <=> visible', animate('1s')),
    ]),
  ],
})
export class InvaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  state = 'visible';
  index = 0;
  iconPath = '/assets/figures/invader1_state2.png';
  invadersArray = [
    '/assets/figures/invader1_state1.png',
    '/assets/figures/invader1_state2.png',
  ];

  constructor() {}

  ngOnInit(): void {
    this.subscription = interval(2000).subscribe((x) => {
      // console.log(x);
      // this.state = this.state === 'visible' ? 'invisible' : 'visible';
      // if (x % 2 === 0) {
      //   this.index = (x / 2) % 3;
      // }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
