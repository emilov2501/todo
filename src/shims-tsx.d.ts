import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface ElementClass extends Vue {}
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
