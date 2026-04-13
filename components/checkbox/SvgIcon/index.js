import { __rest } from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import './styles.scss';
function SvgIcon(props) {
    const { children, className, color = 'inherit', component: Component = 'svg', fontSize, size = 'default', stroked = false, style = {}, title, variant = 'default', viewBox = '0 0 24 24' } = props, other = __rest(props, ["children", "className", "color", "component", "fontSize", "size", "stroked", "style", "title", "variant", "viewBox"]);
    return (React.createElement(Component, Object.assign({ "aria-hidden": !title, "aria-label": title, className: classNames('svgicon', {
            ['svgicon' + '--state-' + variant]: variant !== 'default',
            ['svgicon' + '--fontSize-' + size.toLowerCase()]: size.toLowerCase() !== 'default',
            ['svgicon' + '--stroked']: stroked,
        }, className), color: color, focusable: !title, role: title ? 'presentation' : 'img', style: Object.assign({ fontSize: fontSize }, style), tabIndex: title ? 0 : -1, viewBox: viewBox }, other), children));
}
export default React.memo(SvgIcon);
//# sourceMappingURL=index.js.map