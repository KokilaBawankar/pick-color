import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {PickColorModule} from '../pick-color/pick-color.module';
import {IonicColorPickerModule} from 'ionic-color-picker';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        PickColorModule,
        IonicColorPickerModule
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
