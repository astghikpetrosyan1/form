import * as React from 'react';
import Button from '@helsenorge/designsystem-react/components/Button';
import toolkitstyles from '../styles.module.scss';
const FormDraftButton = (props) => {
    const onClickHandler = (event) => {
        if (event) {
            event.preventDefault();
        }
        props.onFormSubmit(() => {
            if (props.onDraft) {
                props.onDraft();
            }
        });
    };
    if (!props.draftButtonText || !props.onDraft) {
        return null;
    }
    return (React.createElement(Button, { variant: 'outline', formNoValidate: true, wrapperClassName: `${toolkitstyles.form__buttonwrapper__button} ${props.draftButtonClasses}`, onClick: onClickHandler, "data-testid": props.draftButtonTestId }, props.draftButtonText));
};
export default FormDraftButton;
//# sourceMappingURL=form-draft-button.js.map