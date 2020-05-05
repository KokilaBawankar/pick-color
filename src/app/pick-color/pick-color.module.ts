import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PickColorDirective} from './directives/pick-color.directive';
import {PickColorModalPageModule} from './pages/pick-color-modal.module';

@NgModule({
    declarations: [PickColorDirective],
    imports: [
        CommonModule,
        PickColorModalPageModule
    ],
    exports: [PickColorDirective]
})
export class PickColorModule {
}
