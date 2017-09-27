import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ShowsService {
  api = `http://api.tvmaze.com`;  
  
  constructor(private http: Http) { }

  shows(page: number) {
    return this.http.get(this.api + '/shows?page=' + page)
      .map(res => res.json());
  }

  show(id: number) {
    return this.http.get(this.api + '/shows/' + id)
      .map(res => res.json());
  }

  cast(id: number) {
    return this.http.get(this.api + '/shows/' + id + '/cast')
      .map(res => res.json());
  }

  search(text: string) {
    return this.http.get(this.api + '/search/shows?q=' + text)
      .map(res => res.json());
  }

}