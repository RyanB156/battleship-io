import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuComponent]
})
export class MenuPageModule {}
