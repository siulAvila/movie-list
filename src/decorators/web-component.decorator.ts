import { CustomElementConfig } from '@models';

type Constructor = new (...args: any[]) => HTMLElement;

export function WebComponent({
  shadowDom = true,
  ...config
}: CustomElementConfig) {
  return function <T extends Constructor>(target: T) {
    const template = document.createElement('template');
    config.template = `<style>${config.style}</style> ${config.template}`;

    template.innerHTML = config.template;
    const connectedCallback =
      target.prototype.connectedCallback || function () {};

    target.prototype.connectedCallback = function () {
      const clone = document.importNode(template.content, true);

      if (shadowDom) {
        this.attachShadow({ mode: 'open' }).appendChild(clone);
      } else {
        this.appendChild(clone);
      }

      connectedCallback.call(this);
    };

    customElements.define(config.seletor, target);
  };
}
