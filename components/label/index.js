import * as React from 'react';
import classNames from 'classnames';
import { Sublabel } from './sublabel';
import MainImage from '../main-image';
import toolkitstyles from './styles.module.scss';
export const Label = React.forwardRef(({ labelText, isNotBold, htmlFor, sublabelText, helpButton, className, children, testId, extension }, ref) => {
    const labelRef = React.useRef(null);
    const labelClasses = classNames(toolkitstyles['label'], { [toolkitstyles['label--isnotbold']]: isNotBold });
    return (React.createElement("div", { ref: ref ? ref : labelRef, className: className ? className : '' },
        React.createElement("label", { className: labelClasses, htmlFor: htmlFor, "data-testid": testId },
            labelText,
            helpButton,
            sublabelText && React.createElement(Sublabel, { sublabelText: sublabelText })),
        React.createElement(MainImage, { extension: extension }),
        children));
});
export default Label;
//# sourceMappingURL=index.js.map
