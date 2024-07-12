import * as React from 'react';
import Button from '@helsenorge/designsystem-react/components/Button';
import Icon from '@helsenorge/designsystem-react/components/Icons';
import ArrowRight from '@helsenorge/designsystem-react/components/Icons/ArrowRight';
import toolkitstyles from '../styles.module.scss';
const FormSubmitButton = (props) => {
    const onClickHandler = (event) => {
        if (event) {
            event.preventDefault();
        }
        props.onFormSubmit(() => {
            if (props.onSubmit) {
                props.onSubmit(event);
            }
        });
    };
    if (!props.submitButtonText || !props.onSubmit) {
        return null;
    }
    if (props.submitButtonType === 'display' || props.submitButtonType === 'action') {
        return (React.createElement(Button, { variant: props.submitButtonType === 'display' ? 'fill' : 'outline', wrapperClassName: `${toolkitstyles.form__buttonwrapper__button} ${props.submitButtonClasses ? props.submitButtonClasses : ''}`, disabled: props.submitButtonDisabled, formNoValidate: true, onClick: onClickHandler, testId: props.submitButtonTestId, arrow: props.submitButtonRightIcon },
            props.submitButtonLeftIcon && React.createElement(Icon, { svgIcon: ArrowRight }),
            props.submitButtonText));
    }
    return null;
};
export default FormSubmitButton;
//# sourceMappingURL=form-submit-button.js.map