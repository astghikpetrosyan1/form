import * as React from 'react';
import Button from '@helsenorge/designsystem-react/components/Button';
import { Icon } from '@helsenorge/designsystem-react/components/Icons';
import toolkitstyles from '../styles.module.scss';
const FormPauseButton = (props) => {
    const getButtonVariant = () => {
        if (props.pauseButtonType === 'function' || props.pauseButtonLevel === 'tertiary') {
            return 'borderless';
        }
        else if (props.pauseButtonLevel === 'secondary') {
            return 'outline';
        }
        return 'fill';
    };
    /** Stopper browser validation fra å trigge  */
    const onPauseHandler = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (props.onPause) {
            props.onPause();
        }
    };
    if (!props.pauseButtonText || !props.onPause) {
        return null;
    }
    return (React.createElement(Button, { variant: getButtonVariant(), disabled: props.pauseButtonDisabled, wrapperClassName: `${toolkitstyles.form__buttonwrapper__button} ${props.pauseButtonClasses}`, onClick: onPauseHandler, testId: props.pauseButtonTestId },
        !!props.pauseButtonLeftIcon && React.createElement(Icon, { svgIcon: props.pauseButtonLeftIcon }),
        props.pauseButtonText));
};
export default FormPauseButton;
//# sourceMappingURL=form-pause-button.js.map