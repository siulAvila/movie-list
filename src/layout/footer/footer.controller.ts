import styles from './footer.scss';
import template from './footer.html';

import { Component } from '@decorators';

@Component({
  seletor: 'app-footer',
  template: template,
  style: styles as string,
})
export class Footer extends HTMLElement {}
