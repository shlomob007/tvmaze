import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-widget',
  template: `
    <img #img src="/assets/images/animated_spinner.gif" />
  `,
  styles: [`
    :host {
      display: block;
      width: 210px;
      height: 295px;
      cursor: pointer;
      border: solid 1px;
    }
    img {
      width: 210px;
      height: 295px;
    }
  `]
})
export class ImageWidgetComponent implements OnInit {
  @ViewChild('img', {read: ElementRef}) img: ElementRef;
  @Input() image: string;
  
  constructor() { }

  ngOnInit() {
    this.loadImage(this.image);
  }

  loadImage(url) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const elem = this.img.nativeElement;
      elem.src = image.src;
    };
  }

}
