import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Typer } from './typer.model';

@Injectable()
export class TyperService {

  selectedTyper: Typer;
  avgTyper: Typer;
  readonly baseURL = 'http://localhost:3000/typers';
  readonly avgURL = 'http://localhost:3000/typers/avg';
  constructor(private http : HttpClient) { }

  postTyper(typ: Typer) {
    return this.http.post(this.baseURL, typ);
  }
  getAverageTyper()
  {
    return this.http.get(this.avgURL);
  }
}
