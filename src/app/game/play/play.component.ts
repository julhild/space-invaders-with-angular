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
  QueryList, EventEmitter, Output
} from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { InvaderComponent } from '../invader/invader.component';
import { BulletComponent } from './bullet/bullet.component';
import { PlaceholderDirective } from './placeholder.directive';
import { interval, Subscription } from 'rxjs';
import { eGameMode } from '../game-mode.enum';

export class GameItem {
  height: number;
  top: number;
  constructor(bondingRect: any) {
    this.height = bondingRect.height;
    this.top = bondingRect.top;
  }
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
    animations: [
    trigger('invadersContainer', [
      state('right', style({
        transform: 'translateX(240px)'
      })),
      state('left', style({
        transform: 'translateX(0px)'
      })),
      transition('left <=> right', animate(3000)),
      transition('void <=> left', animate(0)),
      transition('void <=> right', animate(0))
    ])
  ]
})

export class PlayComponent implements OnInit, OnDestroy {

  @Output() changeGameMode = new EventEmitter<string>();

  shipPosition = 225;
  shipIcon = '/assets/figures/defender_ship.png';
  shootLastPressed = null;
  invaders = new Array(18);
  state = 'left';
  invadersPositionTop = 0;
  gameState: any;
  defender: GameItem;

  moveInvaders: Subscription;

  @ViewChildren(InvaderComponent) invaderComponents: QueryList<InvaderComponent>;

  private bulletRefs: ComponentRef<BulletComponent>[] = [];

  @ViewChild(PlaceholderDirective, { static: false })
  bulletHost: PlaceholderDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.defender = new GameItem(document.querySelector('.defender-ship').getBoundingClientRect());
    this.moveInvaders = this.shiftInvaders();
    this.gameState = setInterval(() => this.checkGameState(), 500);

  }

  checkGameState(): void {
    const currentInvaders: HTMLDivElement[] = Array.from(document.querySelectorAll('.invader'));


    for (const invader of currentInvaders) {
      const dims = invader.getBoundingClientRect();

      if (dims.top + dims.height >= this.defender.top) {
          this.changeGameMode.emit(eGameMode.lost);
      }
    }


  }

  shiftInvaders(): Subscription {
    const verticalShift = 100;
    const invaderShift = interval(500).subscribe((x) => {
      if (x % 7 === 0) {
        this.state = x % 14 === 0 ? 'right' : 'left';
      }

      if ((x + 1) % 7 === 0) {
        this.invadersPositionTop += verticalShift;
      }
    });

    return invaderShift;
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
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
    clearInterval(this.gameState);

    this.moveInvaders.unsubscribe();
  }
}
