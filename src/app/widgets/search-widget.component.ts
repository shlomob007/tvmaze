import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-search-widget',
  template: `
    <input type="text" 
      #input 
      (keyup)="keyUp.next($event)" 
      placeholder="Search Shows"/>
    <img class="clear" 
      (click)="onClear()"
      src="/assets/images/x-mark.png" />
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      position: reletive;
    }
    input {
      width: 100%;
      border: solid 1px #c0c0c0;
      border-radius: 5px;
      outline: none;
      font-size: 24px;
      padding-left: 10px;
    }
    input:focus {
      outline: none;
    }
    .clear {
      position: absolute;
      width: 42px;
      height: 42px;
      top: 14px;
      right: 19px;
      cursor: pointer;
      margin: 4px;
    }
  `]
})
export class SearchWidgetComponent implements OnInit {
  @ViewChild('input', {read: ElementRef}) input: ElementRef;
  public keyUp = new Subject<KeyboardEvent>();
  @Output() search = new EventEmitter();
  @Output() clear = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
    const observable = this.keyUp
      .debounceTime(700)
      .subscribe((data) => {
        this.search.emit({text: this.input.nativeElement.value});
      });
  }

  onClear(){
    const elem = this.input.nativeElement;
    if (elem.value !== '') {
      elem.value = '';
      this.clear.emit();
    }
  }

}
