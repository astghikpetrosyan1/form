import * as React from 'react';
import classNames from 'classnames';
import { UnmountClosed } from 'react-collapse';
import './../styles.scss';
export const ValidationError = ({ className, error, isValid, textClassName, testId, }) => {
    let componentError = '';
    if (error) {
        componentError = typeof error === 'string' ? error : error();
    }
    const validationClassNames = classNames(textClassName ? textClassName : 'mol_validation__errortext', {
        'mol_validation__errortext--invalid': !isValid,
    });
    return (React.createElement(UnmountClosed, { isOpened: true, className: className },
        React.createElement("div", { className: validationClassNames, "data-testid": testId, "aria-live": "assertive" }, isValid ? '' : componentError)));
};
export default ValidationError;
//# sourceMappingURL=index.js.map