import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('button', {static: true}) button: ElementRef;

  constructor(private renderer2: Renderer2) {}

    onClick(event) {
        console.log('***', event);
        if (event.color) {
          this.renderer2.setStyle(this.button.nativeElement, 'background', event.color);
        }
    }
}
