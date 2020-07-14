import styles from './style.scss';

class a extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="${styles.classe}">alow</div>`;
  }
}
customElements.define('teste-teste', a);
