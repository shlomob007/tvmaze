import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';

import { ShowsComponent } from './shows.component';
import { ShowComponent } from './show.component';
import { ShowsService } from './shows.service';
import showsRoutes from './shows.routes';
import WidgetsModule from "../widgets/widgets.module";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    showsRoutes,
    WidgetsModule
  ],
  declarations: [ShowsComponent, ShowComponent],
  providers: [{provide: 'showsService', useClass: ShowsService}]
})
export default class ShowsModule { }