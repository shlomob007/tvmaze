import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shows',
  template: `
    <app-search-widget
      (search)="onSearch($event)"
      (clear)="onClear()"
      ></app-search-widget>
    <div class="grid-container">
      <div #grid class="grid">
        <app-image-widget 
          *ngFor="let show of shows"
          [routerLink]="show.id"
          [image]="show.image.medium">
          </app-image-widget>
      </div>
    </div>
    <app-pagination-widget
      *ngIf="!isUseSearch"
      [page]="page"
      (select)="onSelect($event)"></app-pagination-widget>
  `,
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit {
  @ViewChild('grid', {read: ElementRef}) grid: ElementRef;
  shows;
  errorMessage;
  isUseSearch: boolean = false;
  page: number = 0;
  
  constructor(@Inject('showsService') private showsService) { }

  ngOnInit() {
    const data = sessionStorage.getItem('page');
    this.page = data === null ? 0 : parseInt(data);

    this.fetch(this.page);
  }

  private fetch(page): void {
    this.showsService.shows(page)
      .do((shows:any) => shows.map((s) => {
        s.image = s.image === null
          ? { 
              medium: '/assets/images/no_image_available.jpg',
              original: '/assets/images/no_image_available.jpg'
            }
          : s.image; 
      }))
      .subscribe(shows => this.shows = shows,
        error => this.errorMessage = error);
  }

  onSelect(event) {
    this.page = event.page; 
    sessionStorage.setItem('page', this.page + '');
    this.fetch(this.page);
    const elem = this.grid.nativeElement;
    elem.scrollTo(0, 0);
  }

  onSearch(event) {
    this.isUseSearch = true;
    this.showsService.search(event.text)
      .do((shows:any) => shows.map((s, i, arr) => {
        arr[i] = s.show;
      }))
      .do((shows:any) => shows.map((s) => {
        s.image = s.image === null
          ? { medium: '', original: ''}
          : s.image; 
      }))
      .subscribe(shows => this.shows = shows,
        error => this.errorMessage = error);
  }

  onClear() {
    this.isUseSearch = false;
    this.fetch(this.page);
  }

}
