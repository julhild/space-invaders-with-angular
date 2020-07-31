import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-defender-ship',
  templateUrl: './defender-ship.component.html',
  styleUrls: ['./defender-ship.component.css'],
})
export class DefenderShipComponent implements OnInit, AfterViewInit {
  @ViewChild('ship') ship: ElementRef;
  playFieldHeight: number;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // console.log(this.ship.nativeElement.parentElement);
  }

  ngAfterViewInit() {
    console.log(
      this.ship.nativeElement.parentElement.parentElement.offsetHeight
    );
  }
}
