import {
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import {ModalController} from '@ionic/angular';

import {ColorChangeModel, ColorPickerCloseModel, ColorPickerOpenModel} from '../directives/pick-color.directive';

@Component({
    selector: 'app-pick-color',
    templateUrl: './pick-color-modal.page.html',
    styleUrls: ['./pick-color-modal.page.scss'],
})
export class PickColorModalPage implements OnInit, OnDestroy {

    @Output() colorPickerOpen: EventEmitter<ColorPickerOpenModel> = new EventEmitter();
    @Output() colorPickerClose: EventEmitter<ColorPickerCloseModel> = new EventEmitter();
    @Output() colorChange: EventEmitter<ColorChangeModel> = new EventEmitter();

    @ViewChild('colorSlider', {static: true}) colorSlider: ElementRef;

    colors: string[] = [];
    selectedColor: string;
    colorSliderConfig = {
        min: -100,
        max: 100,
        value: 0,
        defaultBarBackground: '#e5e5e5'
    };

    constructor(private modalController: ModalController,
                private renderer2: Renderer2) {
    }

    ngOnInit() {
        // @ts-ignore
        this.renderer2.setAttribute(this.colorSlider.el, 'disabled', 'true');
        this.colorPickerOpen.emit({isColorPickerOpen: true});
    }

    ngOnDestroy(): void {
        this.colorPickerClose.emit({isColorPickerClose: true});
    }

    setSelectedColor(color: string) {
        this.selectedColor = color;
        this.setColorSliderBackgroundGradient(color);
        // @ts-ignore
        this.renderer2.setAttribute(this.colorSlider.el, 'value', this.colorSliderConfig.value.toString());
        this.colorChange.emit({color});
        if (this.selectedColor === 'none') {
            // @ts-ignore
            this.renderer2.setAttribute(this.colorSlider.el, 'disabled', 'true');
        } else {
            // @ts-ignore
            this.renderer2.setAttribute(this.colorSlider.el, 'disabled', 'false');
        }
    }

    adjustColor(color: string, customEvent?: CustomEvent, amount?: number) {
        const amt = customEvent ? customEvent.detail.value : amount;
        let usePound = false;

        if (color[0] === '#') {
            color = color.slice(1);
            usePound = true;
        }

        let R = parseInt(color.substring(0, 2), 16);
        let G = parseInt(color.substring(2, 4), 16);
        let B = parseInt(color.substring(4, 6), 16);

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

        return (usePound ? '#' : '') + RR + GG + BB;
    }

    setColorSliderBackgroundGradient(color: string) {
        if (color !== 'none') {
            const darkColor = this.adjustColor(color, undefined, this.colorSliderConfig.min) + ' 0%,';
            const middleolor = color + ' 50%,';
            const lightColor = this.adjustColor(color, undefined, this.colorSliderConfig.max) + ' 100%)';
            // 'linear-gradient(100deg, rgba(92,0,0,1) 0%, rgba(192,57,43,1) 50%, rgba(255,157,143,1) 100%)'
            const linearGradient = 'linear-gradient(100deg, ' + darkColor + middleolor + lightColor;
            // @ts-ignore
            this.renderer2.setStyle(this.colorSlider.el.shadowRoot.children[1].children[0], 'background', linearGradient);
        } else {
            // @ts-ignore
            this.renderer2.setStyle(this.colorSlider.el.shadowRoot.children[1].children[0],
                              'background', this.colorSliderConfig.defaultBarBackground);
        }
    }

    onColorSliderChange(selectedColor: string, $event: CustomEvent<any>) {
        this.colorChange.emit({color: this.adjustColor(selectedColor, $event)});
    }
}
