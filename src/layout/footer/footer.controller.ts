import styles from './footer.scss';
import template from './footer.html';

import { WebComponent } from '@decorators';

@WebComponent({
  seletor: 'app-footer',
  template: template,
  style: styles as string,
})
export class Footer extends HTMLElement {}
