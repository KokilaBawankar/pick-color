import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';

import {
    ColorChangeModel, ColorPickerCloseModel, ColorPickerOpenModel,
} from './pick-color.directive';

@Component({
    selector: 'app-pick-color',
    templateUrl: './pick-color.page.html',
    styleUrls: ['./pick-color.page.scss'],
})
export class PickColorPage implements OnInit, OnDestroy {

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onColorPickerOpen: EventEmitter<ColorPickerOpenModel> = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onColorPickerClose: EventEmitter<ColorPickerCloseModel> = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onColorChange: EventEmitter<ColorChangeModel> = new EventEmitter();

    colors: string[] = [];
    selectedColor: string;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
        this.onColorPickerOpen.emit({isColorPickerOpen: true});
    }

    dismiss() {
        this.modalController.dismiss();
    }

    ngOnDestroy(): void {
        this.onColorPickerClose.emit({isColorPickerClose: true});
    }

    setSelectedColor(color: string) {
        this.selectedColor = color;
        this.onColorChange.emit({color});
    }

    /*adjustColor(color: string, customEvent: CustomEvent) {
        console.log(customEvent.detail.value);
        console.log( '#' + color.replace(/^#/, '').replace(
            /../g, clr => ('0' + Math.min(255, Math.max(0, parseInt(clr, 16) + customEvent.detail.value)).toString(16)).substr(-2)));
    }*/

    adjustColor(col: string, customEvent: CustomEvent) {

        const amt = customEvent.detail.value;
        let usePound = false;

        if (col[0] === '#') {
            col = col.slice(1);
            usePound = true;
        }

        let R = parseInt(col.substring(0, 2), 16);
        let G = parseInt(col.substring(2, 4), 16);
        let B = parseInt(col.substring(4, 6), 16);

        // to make the colour less bright than the input
        // change the following three "+" symbols to "-"
        R = R + amt;
        G = G + amt;
        B = B + amt;

        if (R > 255) {
            R = 255;
        } else if (R < 0) {
            R = 0;
        }

        if (G > 255) {
            G = 255;
        } else if (G < 0) {
            G = 0;
        }

        if (B > 255) {
            B = 255;
        } else if (B < 0) {
            B = 0;
        }

        const RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16));
        const GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16));
        const BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16));

        console.log((usePound ? '#' : '') + RR + GG + BB)
        return (usePound ? '#' : '') + RR + GG + BB;

    }
}
