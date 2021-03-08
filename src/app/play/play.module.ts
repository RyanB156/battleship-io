import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlayPageRoutingModule } from './play-routing.module';
import { PlayComponent } from './play.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlayPageRoutingModule,
  ],
  declarations: [PlayComponent]
})
export class PlayPageModule {}
