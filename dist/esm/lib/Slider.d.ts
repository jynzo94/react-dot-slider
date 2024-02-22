import { ReactNode } from 'react';
import { OuterButtonStyles } from './styled/OuterButton';
import { InnerButtonStyles } from './styled/InnerButton';
import { ArrowSvgStyles } from './styled/ArrowSvg';
export type SliderStyle = ArrowSvgStyles & OuterButtonStyles & InnerButtonStyles & {
    arrowStrokeWidth?: number;
};
type Props = {
    children: ReactNode;
    styles?: SliderStyle;
};
export default function Slider(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
