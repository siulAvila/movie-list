import { Component } from '@decorators';
import { apiRequest } from '@utils/http-request';

import { Movie } from '@models';

import styles from './carrousel.scss';

import template from './carrousel.html';

@Component({
  seletor: 'app-carrousel',
  style: styles as string,
  template: template,
})
export class Carrousel extends HTMLElement {
  movieList: Movie[] = [];
  displayPortWidth = window.innerWidth;
  scrollPosition = 0;

  get() {
    apiRequest('movies').subscribe(
      (data: Movie[]) => {
        this.movieList = data;
        this.render();
      },
      (error) => {}
    );
  }

  connectedCallback() {
    this.get();
  }

  render() {
    const ulMovieList = this.shadowRoot!.querySelector(
      '.row'
    ) as HTMLUListElement;

    ulMovieList.innerHTML += this.movieList
      .map((movie) => {
        return `<li class="movie"> <img class="movie__img" src="${movie.images[0]}"></li>`;
      })
      .join('');
    this.createEventListeners();
  }

  createEventListeners() {
    const elLeftArrowIcon = this.shadowRoot!.getElementById('left');
    const elRightArrowIcon = this.shadowRoot!.getElementById('right');
    const row = this.shadowRoot!.querySelector('.row')! as HTMLElement;

    elRightArrowIcon!.addEventListener(
      'click',
      this.scrollToLeft.bind(this, this.scrollPosition, row)
    );
    elLeftArrowIcon!.addEventListener(
      'click',
      this.scrollToRight.bind(this, this.scrollPosition, row)
    );
  }

  scrollToRight(x: number, element: HTMLElement) {
    const elementWidth = element.scrollWidth - element.clientWidth;
    if (this.scrollPosition < elementWidth) {
      const scrollValue =
        this.scrollPosition + this.displayPortWidth > elementWidth
          ? elementWidth - this.scrollPosition
          : this.scrollPosition + this.displayPortWidth;

      this.scrollPosition += scrollValue;
      element.style.transform = `translateX(-${this.scrollPosition}px)`;
    }
  }

  scrollToLeft(x: number, element: HTMLElement) {
    if (this.scrollPosition > this.displayPortWidth) {
      this.scrollPosition -= this.displayPortWidth;
      element.style.transform = `translateX(-${this.scrollPosition}px)`;
    } else if (this.scrollPosition <= this.displayPortWidth) {
      this.scrollPosition = 0;
      element.style.transform = `translateX(0px)`;
    }
  }
}
