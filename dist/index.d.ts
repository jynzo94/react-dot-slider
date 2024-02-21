import * as react from 'react';
import { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type Props = {
    children: ReactNode;
};
declare function Slider(props: Props): react_jsx_runtime.JSX.Element;

declare const _default: {
    Slider: typeof Slider;
    Slide: react.ForwardRefExoticComponent<Omit<any, "ref"> & react.RefAttributes<unknown>>;
};

export { _default as default };
