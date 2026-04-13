import * as React from 'react';
import './styles.scss';
interface SvgIconPropsInterface {
    children: JSX.Element | Array<JSX.Element>;
    component?: React.ReactType;
    stroked?: boolean;
    viewBox?: string;
}
export interface SvgIconProps extends Pick<React.SVGAttributes<SVGElement>, Exclude<keyof React.SVGAttributes<SVGElement>, keyof SvgIconPropsInterface>>, React.RefAttributes<SVGElement> {
    color?: string;
    className?: string;
    fontSize?: string | number;
    size?: 'small' | 'large' | 'inherit';
    title?: string;
    style?: React.CSSProperties;
    variant?: 'success' | 'warning' | 'error' | 'disabled';
    tabIndex?: number;
}
declare function SvgIcon(props: SvgIconProps & SvgIconPropsInterface): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof SvgIcon>;
export default _default;
//# sourceMappingURL=index.d.ts.map