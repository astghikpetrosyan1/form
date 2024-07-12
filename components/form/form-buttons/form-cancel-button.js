import * as React from 'react';
import Button from '@helsenorge/designsystem-react/components/Button';
import Icon from '@helsenorge/designsystem-react/components/Icons';
import toolkitstyles from '../styles.module.scss';
const FormCancelButton = (props) => {
    if (!props.cancelButtonText || !props.onCancel) {
        return null;
    }
    /** Stopper browser validation fra å trigge  */
    const onCancelHandler = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (props.onCancel) {
            props.onCancel(e);
        }
    };
    return (React.createElement(Button, { variant: props.cancelButtonOutline ? 'outline' : 'borderless', wrapperClassName: `${toolkitstyles.form__buttonwrapper__button} ${props.cancelButtonClasses ? props.cancelButtonClasses : ''}`, onClick: onCancelHandler, disabled: props.cancelButtonDisabled, testId: props.cancelButtonTestId },
        !!props.cancelButtonLeftIcon && React.createElement(Icon, { svgIcon: props.cancelButtonLeftIcon }),
        props.cancelButtonText));
};
export default FormCancelButton;
//# sourceMappingURL=form-cancel-button.js.map