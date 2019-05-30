import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, delay } from "rxjs/operators";

import { Heroe } from '../models/Heroe';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  url: string = 'https://crud-angular-8c228.firebaseio.com';

  constructor(
    private http: HttpClient
  ) { }

  getHeroes(): Observable<any> {
    return this.http.get(`${this.url}/heroes.json`).pipe(
      map((resp: any) => this.crearArreglo(resp)), delay(1500));
  }

  getHeroe(id: string): Observable<Object> {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  private crearArreglo(obj: object): Heroe[] {
    const heroes: Heroe[] = [];

    if (obj === null) return [];

    Object.keys(obj).forEach(key => {
      const heroe: Heroe = obj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }

  postHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name
        return heroe;
      })
    );
  }

  putHeroe(heroe: Heroe): Observable<Object> {
    const temp = { ...heroe };

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, temp);
  }

  deleteHeroe(id: String): Observable<Object> {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

}
