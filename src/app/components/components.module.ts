import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { PipesModule } from '../pipes/pipes.module';
import { RepartoSlideComponent } from './reparto-slide/reparto-slide.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    RepartoSlideComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    PipesModule
  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    RepartoSlideComponent
  ]
})
export class ComponentsModule { }
