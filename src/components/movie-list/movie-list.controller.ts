import { WebComponent } from '@decorators';
import { apiRequest } from '@utils/http-request';

import { Movie } from '@models';

import styles from './movie-list.scss';

import template from './movie-list.html';

@WebComponent({
  seletor: 'movie-list',
  style: styles as string,
  template: template,
})
export class MovieList extends HTMLElement {
  movieList: Movie[] = [];

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
    const ulMovieList = this.shadowRoot!.getElementById(
      'row'
    ) as HTMLUListElement;

    ulMovieList.innerHTML += this.movieList
      .map((movie) => {
        return `<li class="movie"> <img class="movie__img" src="${movie.images[0]}"></li>`;
      })
      .join('');
    this.createEventListeners();
  }

  createEventListeners() {}
}
