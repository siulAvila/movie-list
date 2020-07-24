import styles from './header.scss';
import { WebComponent } from '@decorators';
import template from './header.html';

@WebComponent({
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
