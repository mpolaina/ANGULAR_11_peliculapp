import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Cast } from '../../interfaces/movie-credits';

@Component({
  selector: 'app-reparto-slide',
  templateUrl: './reparto-slide.component.html',
  styleUrls: ['./reparto-slide.component.css']
})
export class RepartoSlideComponent implements OnInit, AfterViewInit {

  @Input() reparto: Cast[]

  constructor() { }

  ngOnInit(): void {

      //console.log(this.reparto)
  }

  ngAfterViewInit(){

      const swiper = new Swiper('.swiper-container',{
          slidesPerView: 6,
          freeMode: true,
          spaceBetween: 16
      })
  }

}
