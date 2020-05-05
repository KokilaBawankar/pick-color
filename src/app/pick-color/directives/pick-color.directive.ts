import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PickColorModalPage} from '../pages/pick-color-modal.page';

export interface ColorPickerOpenModel {
    isColorPickerOpen: boolean;
}

export interface ColorPickerCloseModel {
    isColorPickerClose: boolean;
}

export interface ColorChangeModel {
    color: string;
}

@Directive({
    selector: '[appPickColor]'
})
export class PickColorDirective implements OnInit {

    @Output() colorPickerOpen: EventEmitter<ColorPickerOpenModel> = new EventEmitter();
    @Output() colorPickerClose: EventEmitter<ColorPickerCloseModel> = new EventEmitter();
    @Output() colorChange: EventEmitter<ColorChangeModel> = new EventEmitter();

    @Input() colors: string[] = [
        '#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9', '#3498DB', '#1ABC9C', '#16A085', '#27AE60', '#2ECC71',
        '#F1C40F', '#F39C12', '#E67E22', '#D35400', '#ECF0F1', '#BDC3C7', '#95A5A6', '#7F8C8D', '#34495E', '#2C3E50'];
    @Input() position = 'bottom';

    constructor(private elementRef: ElementRef,
                private modalController: ModalController) {
    }

    ngOnInit(): void {
        this.generateColors();
    }

    @HostListener('click', ['$event'])
    async openColorPicker(event) {
        const modal = await this.modalController.create({
            component: PickColorModalPage,
            backdropDismiss: false,
            showBackdrop: true,
            componentProps: {
                colorPickerOpen: this.colorPickerOpen,
                colorPickerClose: this.colorPickerClose,
                colorChange: this.colorChange,
                colors: this.colors
            },
            cssClass: ['pick-color-modal', 'pick-color-modal-' + this.position.trim()]
        });
        await modal.present();
    }

    generateColors() {

    }
}
