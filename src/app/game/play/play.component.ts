import {
  Component,
  ComponentRef,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ComponentFactoryResolver,
  Injector,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { InvaderComponent } from '../invader/invader.component';
import { BulletComponent } from './bullet/bullet.component';
import { PlaceholderDirective } from './placeholder.directive';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
    animations: [
    trigger('invadersContainer', [
      state('left', style({
        transform: 'translateX(240px)'
      })),
      state('right', style({
        transform: 'translateX(0px)'
      })),
      transition('left <=> right', animate(3000)),
      transition('void <=> left', animate(0))
    ]),
  ]
})
export class PlayComponent implements OnInit, OnDestroy {
  shipPosition = 225;
  shipIcon = '/assets/figures/defender_ship.png';
  shootLastPressed = null;
  numberOfInvaders = 15;
  invaders = new Array(18);
  state = 'right';
  invadersPositionTop = 0;

  subscription: Subscription;

  @ViewChildren(InvaderComponent) invaderComponents: QueryList<InvaderComponent>;

  private bulletRefs: ComponentRef<BulletComponent>[] = [];

  @ViewChild(PlaceholderDirective, { static: false })
  bulletHost: PlaceholderDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.subscription = interval(500).subscribe((x) => {
      if (x % 7 === 0) {
        this.state = x % 14 === 0 ? 'left' : 'right';
      }

      if ((x + 1) % 7 === 0) {
        this.invadersPositionTop += 10;
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);

    if (event.code === 'ArrowRight') {
      this.onArrowRight();
    }

    if (event.code === 'ArrowLeft') {
      this.onArrowLeft();
    }

    if (event.code === 'Space') {
      this.onShoot();
    }
  }

  onArrowLeft() {
    if (this.shipPosition > 10) {
      this.shipPosition -= 10;
    }
    return;
  }

  onArrowRight() {
    if (this.shipPosition < 440) {
      this.shipPosition += 10;
    }
    return;
  }

  onShoot() {
    const now = Date.now();
    if (now - this.shootLastPressed > 500) {
      this.shootBullet();
      this.shootLastPressed = now;
    }
    return;
  }

  private shootBullet() {
    const bulletCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      BulletComponent
    );

    const hostViewContainerRef = this.bulletHost.viewContainerRef;
    const bulletRef = bulletCmpFactory.create(this.injector);

    // defender position + middle of the defender - middle of the bullet
    bulletRef.instance.positionX = this.shipPosition + 23;
    this.bulletRefs.push(bulletRef);
    hostViewContainerRef.insert(bulletRef.hostView);

    // in case the bullet does not hit any destroyer, it is removed from the view
    setTimeout(() => {
      const viewIndex = hostViewContainerRef.indexOf(bulletRef.hostView);

      if (viewIndex !== -1) {
        hostViewContainerRef.remove(viewIndex);
      }
    }, 3000);
  }

  ngOnDestroy() {
    this.bulletHost.viewContainerRef.clear();
  }
}
