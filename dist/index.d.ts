import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode } from 'react';

type OuterButtonStyles = {
    $outerButtonBgColor?: string;
    $outerButtonSize?: string;
    $outerButtonBorder?: string;
    $outerButtonMarginX?: string;
};

type InnerButtonStyles = {
    $innerButtonBorder?: string;
    $innerButtonSize?: string;
    $innerButtonMarginX?: string;
    $innerButtonInactiveBgColor?: string;
    $innerButtonActiveBgColor?: string;
};

type ArrowSvgStyles = {
    $arrowSvgColor?: string;
};

type SliderStyle = ArrowSvgStyles & OuterButtonStyles & InnerButtonStyles & {
    arrowStrokeWidth?: number;
};
type Props = {
    children: ReactNode;
    styles?: SliderStyle;
};
declare function Slider(props: Props): react_jsx_runtime.JSX.Element;

declare const Slide: react.ForwardRefExoticComponent<Omit<any, "ref"> & react.RefAttributes<unknown>>;

export { Slide, Slider };
