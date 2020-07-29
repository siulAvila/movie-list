export function Input(alias: string) {
  return (target: any, propertyName: string) => {
    let value: string;
    const name = alias ?? propertyName;

    const connectedCallback =
      target.constructor.prototype.connectedCallback || function () {};
    const element = target.constructor.prototype;
    element.connectedCallback = function () {
      value = this.getAttribute(name);

      connectedCallback.call(this);
    };

    Object.defineProperty(target, propertyName, {
      set: () => {
        return value;
      },
      get: () => {
        return value;
      },
    });
  };
}
