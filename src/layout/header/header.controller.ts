import styles from './header.scss';
import { Component } from '@decorators';
import template from './header.html';

@Component({
  seletor: 'app-header',
  template: template,
  style: styles as string,
})
export class Header extends HTMLElement {
  constructor() {
    super();
    window.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
      }
    });
  }
}
