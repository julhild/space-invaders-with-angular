import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-invader',
  templateUrl: './invader.component.html',
  styleUrls: ['./invader.component.css'],

})

export class InvaderComponent implements OnInit, OnDestroy {
  @Input() invaderIndex: number;
  subscription: Subscription;
  state = 'left';
  index = 0;
  positionLeft = 0;
  iconArray: Array<string>;
  invadersArray1 = [
    '/assets/figures/invader1_state1.png',
    '/assets/figures/invader1_state2.png',
  ];

  invadersArray2 = [
    '/assets/figures/invader2_state1.png',
    '/assets/figures/invader2_state2.png',
  ];

  constructor() {}

  ngOnInit(): void {
    this.positionLeft = this.invaderIndex * 45;
    this.iconArray = (this.invaderIndex % 12 < 6) ? (this.invaderIndex % 2 ? this.invadersArray1 : this.invadersArray2)
      : (this.invaderIndex % 2 ? this.invadersArray2 : this.invadersArray1);
    this.subscription = interval(150).subscribe((x) => {
      if (x % 2 === 0) {
        this.index = (x / 2) % 2;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
