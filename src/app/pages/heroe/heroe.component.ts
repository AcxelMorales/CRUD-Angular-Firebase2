import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';

import { Heroe } from 'src/app/models/Heroe';
import { HeroeService } from 'src/app/services/heroe.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe;

  constructor(
    private _heroeService: HeroeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.heroe = new Heroe();

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this._heroeService.getHeroe(id).subscribe((resp: Heroe) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  public save(form: NgForm): void {
    if (form.invalid) return;

    if (this.heroe.id) {
      this._heroeService.putHeroe(this.heroe)
        .subscribe(
          resp => {
            Swal.fire({
              type: 'success',
              title: 'Actualizar',
              text: `Héroe actualizo exitosamente`
            });
          },
          err => {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: `Error al crear el Héroe`
            });
          }
        );
    } else {
      this._heroeService.postHeroe(this.heroe)
        .subscribe(
          resp => {
            Swal.fire({
              type: 'success',
              title: 'Crear',
              text: `Héroe ${resp.nombre} creado exitosamente`
            });

            this.router.navigateByUrl('/');
          },
          err => {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: `Error al crear el Héroe`
            });
          }
        );
    }

  }

}
