import styles from './home.scss';

import template from './home.html';
import { WebComponent } from '@decorators';

import { Carrousel, Title } from '@components';
import { Header, Footer } from '@layout';

@WebComponent({
  seletor: 'app-home',
  style: styles as string,
  template: template,
})
export class Home extends HTMLElement {
  connectedCallback() {
    new Header();
    new Title();
    new Carrousel();
    new Footer();
  }
}
