import styles from './header.scss';
import { Component } from '@decorators';
import template from './header.html';

@Component({
  seletor: 'app-header',
  template: template,
  style: styles as string,
})
export class Header extends HTMLElement {
  connectedCallback() {
    this.createEventListener();
  }

  createEventListener() {
    window.addEventListener('scroll', () => {
      const header = this.shadowRoot!.querySelector('header');

      if (window.scrollY === 0) {
        header?.classList.remove('header--scrolling');
        header?.classList.add('header--initial');
      } else {
        header?.classList.remove('header--initial');
        header?.classList.add('header--scrolling');
      }
    });
  }
}
