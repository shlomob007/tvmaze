import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-widget',
  template: `
    <div class="page" *ngFor="let p of pages"
         [ngClass]="{'selected': p === page}"
         (click)="onClick(p)">{{p + 1}}</div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
    }

    .page {
      color: #999999;
      font-size: 24px;
      text-align: center;
      min-width: 35px;
      height: 30px;
      cursor: pointer;
      border-radius: 5px;
      margin: 5px;
    }
    .page:hover {
      background-color: #c0c0c0;
    }

    .page.selected {
      background-color: #4BBF66;
      color: #ffffff;
    }
    
  `]
})
export class PaginationWidgetComponent implements OnInit {
  @Input() page: number;
  @Output() select = new EventEmitter();
  pages;
  
  constructor() { 
    
  }

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.setPages(this.page);
  }

  onClick(page) {
    this.select.emit({page})
  }

  private setPages(page) {
    let left = 4;
    let right = 5;
    let pagesLeft = [];
    let pagesRight = [];
    
    if (page - left < 0) { left--; right++; }
    if (page - left < 0) { left--; right++; }
    if (page - left < 0) { left--; right++; }
    if (page - left < 0) { left--; right++; }
    
    for(let i = 0; i < left; i++) {
      pagesLeft[i] = page - (left - i);
    }
    for(let i = 0; i < right; i++) {
      pagesRight[i] = page + i + 1;
    }
    
    this.pages = pagesLeft.concat([this.page], pagesRight);
  }

}
