import { Component, HostListener } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent {

  public movies: Movie[] = []
  public moviesSlideShow: Movie[] = []

  @HostListener('window:scroll', ['$event'])
  onScroll(){

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight)

    if ( pos > max){

      if ( this.peliculasService.cargando ){ return }
      this.peliculasService.getCartelera().subscribe( movies => {
          this.movies.push(...movies)
      })
    }
  }

  constructor( private peliculasService: PeliculasService) {

    this.peliculasService.getTopRated()
        .subscribe( movies => {
            //console.log(resp)
            this.movies = movies
            this.moviesSlideShow = movies
        })
  }

}
