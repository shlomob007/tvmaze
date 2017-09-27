import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ImageWidgetComponent } from "./image-widget.component";
import { PaginationWidgetComponent } from "./pagination-widget.component";
import { SearchWidgetComponent } from "./search-widget.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    ImageWidgetComponent,
    PaginationWidgetComponent,
    SearchWidgetComponent],
  exports:[
    ImageWidgetComponent,
    PaginationWidgetComponent,
    SearchWidgetComponent,
    CommonModule
  ]
})
export default class WidgetsModule { }