import * as React from 'react';
import classNames from 'classnames';
import { Sublabel } from './sublabel';
import toolkitstyles from './styles.module.scss';
export const Label = React.forwardRef(({ labelText, isNotBold, htmlFor, sublabelText, helpButton, className, children, testId }, ref) => {
    const labelRef = React.useRef(null);
    const labelClasses = classNames(toolkitstyles['label'], { [toolkitstyles['label--isnotbold']]: isNotBold });
    return (React.createElement("div", { ref: ref ? ref : labelRef, className: className ? className : '' },
        React.createElement("label", { className: labelClasses, htmlFor: htmlFor, "data-testid": testId },
            labelText,
            helpButton,
            sublabelText && React.createElement(Sublabel, { sublabelText: sublabelText })),
        React.createElement("div", null,
            React.createElement("img", { src: '', alt: '' })),
        children));
});
export default Label;
//# sourceMappingURL=index.js.map