import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/movie-credits';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieDetails
  public reparto: Cast[] = []

  constructor( private aR: ActivatedRoute,
                private peliculasService: PeliculasService,
                private location: Location,
                private router: Router
               ) { }

  ngOnInit(): void {

      const { id } = this.aR.snapshot.params

      combineLatest([

          this.peliculasService.getPeliculaDetalle( id ),
          this.peliculasService.getReparto( id )

      ]).subscribe( ( [pelicula, reparto] ) => {

            if (!pelicula){
               this.router.navigateByUrl('/home')
               return;
            }

            this.pelicula = pelicula
            this.reparto = reparto.filter( actor => actor.profile_path != null)

      })

      // this.peliculasService.getPeliculaDetalle( id ).subscribe( movie => {

      //     if (!movie){
      //       this.router.navigateByUrl('/home')
      //       return;
      //     }

      //     this.pelicula = movie
      // })

      // this.peliculasService.getReparto( id ).subscribe( cast => {

      //     this.reparto = cast.filter( actor => actor.profile_path != null)
      //     //console.log(this.reparto)
      // })
  }

  onRegresar(){
    this.location.back()
  }

  getReparto(){

  }

}
