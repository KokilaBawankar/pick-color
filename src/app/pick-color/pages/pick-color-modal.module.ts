import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PickColorModalPage } from './pick-color-modal.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents: [PickColorModalPage],
  declarations: [PickColorModalPage]
})
export class PickColorModalPageModule {}
