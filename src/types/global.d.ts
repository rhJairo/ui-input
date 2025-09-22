declare module '*.module.scss';
declare module '*.module.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.css';
declare module '*.png';
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}
