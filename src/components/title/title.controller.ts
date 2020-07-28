import { WebComponent } from '@decorators';

import styles from './title.scss';
import template from './title.html';

@WebComponent({
  seletor: 'app-title',
  style: styles as string,
  template: template,
})
export class Title extends HTMLElement {
  connectedCallback() {}
}
