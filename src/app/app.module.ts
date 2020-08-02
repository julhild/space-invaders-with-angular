import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { PlayComponent } from './game/play/play.component';
import { GameInfoComponent } from './game/game-info/game-info.component';
import { DefenderShipComponent } from './game/play/defender-ship/defender-ship.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayComponent,
    GameInfoComponent,
    DefenderShipComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
