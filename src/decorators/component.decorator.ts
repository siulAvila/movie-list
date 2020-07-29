import { CustomElementConfig } from '@models';

type Constructor = new (...args: any[]) => HTMLElement;

export function Component({
  shadowDom = true,
  ...config
}: CustomElementConfig) {
  return function <T extends Constructor>(target: T) {
    const template = document.createElement('template');
    config.template = `<style>${config.style}</style> ${config.template}`;

    const connectedCallback =
      target.prototype.connectedCallback || function () {};

    target.prototype.connectedCallback = function () {
      connectedCallback.call(this);

      template.innerHTML = dataBinding(config.template, target.prototype);

      const clone = document.importNode(template.content, true);

      if (shadowDom) {
        this.attachShadow({ mode: 'open' }).appendChild(clone);
      } else {
        this.appendChild(clone);
      }
    };

    customElements.define(config.seletor, target);
  };
}

function dataBinding(template: string, element: any) {
  const regex = new RegExp(/{{([^{ , ^}]*)}}/);
  let match;
  while ((match = regex.exec(template))) {
    const binding = match[0];
    const propertyName = match[1];

    template = template.replace(binding, element[propertyName]);
  }
  return template;
}
