import * as React from 'react';
export function Validation({ addFormComponent, removeFormComponent, children, onValidated, showRequiredLabel, showOptionalLabel, requiredLabel, optionalLabel, refCallback, }) {
    const componentRef = React.useRef(null);
    React.useLayoutEffect(() => {
        if (addFormComponent && componentRef.current) {
            addFormComponent(componentRef.current);
        }
        return () => {
            if (removeFormComponent && componentRef.current) {
                removeFormComponent(componentRef.current);
            }
        };
    }, []);
    const clone = React.Children.map(children, child => {
        return React.cloneElement(child, {
            ref: (el) => {
                componentRef.current = el;
                if (refCallback) {
                    refCallback(el);
                }
            },
            onValidated: onValidated,
            showRequiredLabel: showRequiredLabel,
            showOptionalLabel: showOptionalLabel,
            requiredLabel: requiredLabel,
            optionalLabel: optionalLabel,
        });
    });
    return React.createElement(React.Fragment, null, clone);
}
export default Validation;
//# sourceMappingURL=index.js.map