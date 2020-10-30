import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieDetails } from '../interfaces/movie-response';
import { Cast, MovieCredits } from '../interfaces/movie-credits';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl:string = 'https://api.themoviedb.org/3'
  private carteleraPage = 1
  public cargando: boolean = false


  constructor( private http: HttpClient) { }

  get params() {
    return {
      api_key: '1b38adc0a2b46941b8ef7113e118d9b3',
      language: 'es-ES',
      page: this.carteleraPage.toString(),
      region: 'ES'

    }

  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]>{

    if ( this.cargando ) {
      // cargando peliculas
      return of([])
    }

    this.cargando = true

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing`,{ params: this.params })
            .pipe(
              map( (resp) => resp.results),
              tap( () => {
                this.carteleraPage += 1;
                this.cargando = false
              })
            )
  }

  buscarPeliculas( texto:string ): Observable<Movie[]>{

    const params = {...this.params, page: '1', query: texto}

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`,{params}).pipe(
      map( resp => resp.results )
    )
  }

  getTopRated(): Observable<Movie[]>{

    if ( this.cargando ) {
      // cargando peliculas
      return of([])
    }

    this.cargando = true

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/top_rated`,{ params: this.params })
            .pipe(
              map( (resp) => resp.results),
              tap( () => {
                this.carteleraPage += 1;
                this.cargando = false
              })
            )
  }

  getPeliculaDetalle( id: string ){

      return this.http.get<MovieDetails>(`${ this.baseUrl}/movie/${ id }`,{ params: this.params })
                  .pipe(
                    catchError( err => of (null) )
                  )
  }

  getReparto( id: string ): Observable<Cast[]>{

      return this.http.get<MovieCredits>(`${ this.baseUrl}/movie/${ id }/credits`,{ params: this.params })
              .pipe(
                map( resp => resp.cast),
                catchError( err => of([]) )
              )
  }


}
