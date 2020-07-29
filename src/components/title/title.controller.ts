import { Component, Input } from '@decorators';

import styles from './title.scss';
import template from './title.html';

@Component({
  seletor: 'app-title',
  style: styles as string,
  template: template,
})
export class Title extends HTMLElement {
  @Input('title')
  text: string = '';

  connectedCallback() {
    console.log(this.text);
  }
}
