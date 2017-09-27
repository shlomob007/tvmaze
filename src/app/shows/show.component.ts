import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/do";

@Component({
  selector: 'app-show',
  template: `
    <h1 class="title">{{(show$ | async).name}}</h1>
    <div class="details">
      <div>
        <img #img class="poster" 
          src="/assets/images/animated_spinner.gif" />
      </div>
      <div class="summary"
           [innerHTML]="(show$ | async).summary">
      </div>
    </div>
    
    <hr/>

    <h2 *ngIf="(cast$ | async).length > 0">Cast</h2>
    <div class="cast-conatiner">
      <div class="cast" 
           *ngFor="let c of cast$ | async">
        
        <app-image-widget 
          [image]="c.character.image.medium">
          </app-image-widget>

        <div class="name-conatiner">
          <span class="person">{{ c.person.name }}</span>
          <span class="character">as {{ c.character.name }}</span>
        </div>
      </div>

    </div>
  `,
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  @ViewChild('img', {read: ElementRef}) img: ElementRef;
  show$ = new BehaviorSubject({ 
    id: 0, 
    name: 'Loading ...',
    image: {
      medium: ''
    },
    summary: ''
  });
  cast$ = new BehaviorSubject([]);

  constructor(
    @Inject('showsService') private showsService,
    private route:ActivatedRoute) { 

      route.params
        .map((p:any) => p.id)
        .switchMap(id => this.showsService.show(id))
        .do((show:any) => this.loadImage(show.image.original))
        .subscribe(this.show$)

      route.params
        .map((p:any) => p.id)
        .switchMap(id => this.showsService.cast(id))
        .do((cast:any) => cast.map((c) => {
          c.character.image = c.character.image === null
            ? { 
                medium: '/assets/images/no_image_available.jpg',
                original: '/assets/images/no_image_available.jpg'
              }
            : c.character.image; 
        }))
        .subscribe(this.cast$)
    }

  ngOnInit() {

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
