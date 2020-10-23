import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = []

  constructor( private peliculasService: PeliculasService) {

    this.peliculasService.getCartelera()
        .subscribe( resp => {
            //console.log(resp)
            this.movies = resp.results
        })
  }

  ngOnInit(): void {
  }

}
