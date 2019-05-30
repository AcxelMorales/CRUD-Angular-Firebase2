import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Heroe } from 'src/app/models/Heroe';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];
  cargando: boolean = false;

  constructor(
    private _heroeService: HeroeService
  ) { }

  ngOnInit(): void {
    this.cargando = true;

    this._heroeService.getHeroes()
      .subscribe((resp: any) => {
        this.heroes = resp
        this.cargando = false;
      });
  }

  delete(heroe: Heroe, idx: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroes.splice(idx, 1);
        this._heroeService.deleteHeroe(heroe.id).subscribe();
      }
    });
  }

}
