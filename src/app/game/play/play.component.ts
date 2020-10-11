import {
  Component,
  ComponentRef,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';
import { BulletComponent } from './bullet/bullet.component';
import { PlaceholderDirective } from './placeholder.directive';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent implements OnInit, OnDestroy {
  defenderPosition = 225;
  shootLastPressed = null;

  private bulletRefs: ComponentRef<BulletComponent>[] = [];

  @ViewChild(PlaceholderDirective, { static: false })
  bulletHost: PlaceholderDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

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

  ngOnInit(): void {
    const bulletFactory = this.componentFactoryResolver.resolveComponentFactory(
      BulletComponent
    );
  }

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
    bulletRef.instance.positionX = this.defenderPosition + 23;
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
