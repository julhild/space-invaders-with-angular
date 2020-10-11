import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { PlayComponent } from './game/play/play.component';
import { GameInfoComponent } from './game/game-info/game-info.component';
import { BulletComponent } from './game/play/bullet/bullet.component';

import { PlaceholderDirective } from './game/play/placeholder.directive';
import { InvaderComponent } from './game/invader/invader.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayComponent,
    GameInfoComponent,
    BulletComponent,
    PlaceholderDirective,
    InvaderComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
