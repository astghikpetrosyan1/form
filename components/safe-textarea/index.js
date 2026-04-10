import * as React from 'react';
import classNames from 'classnames';
import ValidationError from '../form/validation-error';
import { Label } from '../label';
import toolkitstyles from './styles.module.scss';
const getSize = (props) => {
    const { size, maxlength } = props;
    if (size) {
        return size;
    }
    else if (maxlength) {
        if (maxlength < 250) {
            return 'small';
        }
        else if (maxlength < 500) {
            return 'medium';
        }
        else {
            return 'large';
        }
    }
    else {
        return 'medium';
    }
};
class SafeTextarea extends React.Component {
    constructor(props) {
        super(props);
        this.validator = (value) => {
            const overMaxlength = this.isValueOverMaxLength(value);
            const underMinlength = this.isValueUnderMinLength(value);
            if (overMaxlength || underMinlength) {
                return false;
            }
            else if (this.props.validator) {
                return this.props.validator(value);
            }
            else {
                return true;
            }
        };
        this.isValueOverMaxLength = (value) => {
            return this.props.maxlength && value ? value.replace(/(\r\n|\n|\r)/g, '-').length > this.props.maxlength : false;
        };
        this.isValueUnderMinLength = (value) => {
            return this.props.minlength && value ? value.length < this.props.minlength : false;
        };
        this.validate = (value) => {
            return new Promise((resolve) => {
                const validatedCB = () => {
                    resolve();
                };
                this.setState({ valid: this.validator(value) && this.isValidIfRequired(value) }, validatedCB);
            });
        };
        this.onBlur = (event) => {
            const target = event.target;
            this.setState({ focused: false, blurred: true, valid: this.validator(target.value), validated: true });
            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        };
        this.onChange = (event) => {
            const target = event.target;
            this.handleOnChange(target.value, () => {
                if (this.props.onChange)
                    this.props.onChange(event);
            });
        };
        this.handleOnChange = (value, notify) => {
            this.setState({
                value,
                valid: this.validator(value),
                validated: this.isValueOverMaxLength(value) ? true : this.state.validated,
            });
            if (notify) {
                notify();
            }
        };
        this.notifyValidated = () => {
            if (this.props.onValidated) {
                this.props.onValidated(this.state.valid);
            }
        };
        this.validateField = () => {
            this.setState({ validated: true });
            return this.validate(this.state.value);
        };
        this.isValidIfRequired = (value) => {
            if (this.props.isRequired) {
                return value !== null && value !== undefined && value.toString().trim() !== '';
            }
            return true;
        };
        this.isValid = () => {
            return this.state.valid;
        };
        this.onFocus = (event) => {
            this.setState({ focused: true });
            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        };
        this.focus = () => {
            if (this.textareaRef.current) {
                this.textareaRef.current.focus();
            }
        };
        this.renderSubLabel = () => {
            var _a;
            if (this.props.subLabel) {
                return this.props.subLabel;
            }
            else if (this.props.maxlength && !this.props.hideLengthLabel) {
                return ((_a = this.props.maxLengthText) === null || _a === void 0 ? void 0 : _a.replace('{0}', this.props.maxlength.toString())) || `Maksimum ${this.props.maxlength} tegn`;
            }
            return undefined;
        };
        this.renderLabel = () => {
            const { id, helpButton, label, showLabel, isRequired, requiredLabel, showRequiredLabel, optionalLabel, showOptionalLabel } = this.props;
            if (!showLabel || !id) {
                return null;
            }
            const reqLabel = isRequired && requiredLabel && showRequiredLabel ? React.createElement("em", null,
                " ",
                requiredLabel) : '';
            const optLabel = !isRequired && optionalLabel && showOptionalLabel ? React.createElement("em", null,
                " ",
                optionalLabel) : '';
            const labelText = (React.createElement(React.Fragment, null,
                React.createElement("span", null, label),
                reqLabel,
                optLabel));
            return React.createElement(Label, { htmlFor: id, labelText: labelText, sublabelText: this.renderSubLabel(), helpButton: helpButton });
        };
        this.renderHelp = () => {
            if (this.props.helpElement) {
                return this.props.helpElement;
            }
        };
        this.renderErrorMessage = () => {
            const { isRequired, requiredErrorMessage, errorMessage } = this.props;
            const { valid, value } = this.state;
            let error = '';
            if (!valid) {
                if (isRequired && !this.isValidIfRequired(value) && requiredErrorMessage) {
                    error = typeof requiredErrorMessage === 'string' ? requiredErrorMessage : requiredErrorMessage(value);
                }
                else if (errorMessage) {
                    error = typeof errorMessage === 'string' ? errorMessage : errorMessage(value);
                }
                else {
                    error = 'Ugyldig verdi';
                }
                if (this.isValueOverMaxLength(value)) {
                    error = this.props.stringOverMaxLengthError
                        ? this.props.stringOverMaxLengthError
                        : 'Du har skrevet for mange tegn. Gjør teksten kortere.';
                }
            }
            return React.createElement(ValidationError, { isValid: valid, error: error });
        };
        this.textareaRef = React.createRef();
        this.state = {
            focused: false,
            value: undefined,
            defaultValue: props.value,
            blurred: false,
            valid: true,
            validated: false,
            triggerHandleOnChange: false,
            propValue: props.value, // Kopi av prop.value som brukes til å sammenlikne value-endringer
        };
    }
    componentDidMount() {
        const { value } = this.props;
        this.setState({ size: getSize(this.props), value }, () => {
            if (value === '' || value === null || value === undefined) {
                return;
            }
            else {
                this.validateField();
            }
        });
        if (this.props.autoFocus) {
            const position = this.props.value ? this.props.value.length : 0;
            if (this.textareaRef.current && typeof this.textareaRef.current.setSelectionRange === 'function') {
                this.textareaRef.current.setSelectionRange(position, position);
            }
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const updatedState = Object.assign({}, prevState);
        if (nextProps.value !== prevState.propValue) {
            updatedState.propValue = nextProps.value;
        }
        if (updatedState.propValue && updatedState.propValue !== prevState.defaultValue && !prevState.focused) {
            updatedState.defaultValue = updatedState.propValue;
            updatedState.value = updatedState.propValue;
        }
        if (prevState.size !== nextProps.size || prevState.maxlength !== nextProps.maxlength) {
            updatedState.maxlength = nextProps.maxlength;
            updatedState.size = getSize(nextProps);
        }
        if (nextProps.validateOnExternalUpdate && nextProps.value !== prevState.propValue) {
            updatedState.triggerHandleOnChange = true;
        }
        if (updatedState !== prevState) {
            return updatedState;
        }
        else {
            return null;
        }
    }
    componentDidUpdate(_prevProps, prevState) {
        var _a;
        if (this.state.triggerHandleOnChange) {
            this.handleOnChange((_a = this.props.value) !== null && _a !== void 0 ? _a : '');
            this.setState({ triggerHandleOnChange: false });
        }
        if (prevState.valid !== this.state.valid) {
            this.notifyValidated();
        }
    }
    render() {
        const { maxlength, isRequired, minlength, id, rows, placeholder, autoFocus, disabled, ariaLabel, readOnly, children, wrapperClasses, charCounterClasses, } = this.props;
        const { value, valid, validated, size } = this.state;
        const counterPrefixText = '/'; // TODO: Replace with resource values
        const counterInfixText = 'av'; // TODO: Replace with resource values
        const counterSuffixText = ' tegn brukt'; // TODO: Replace with resource values
        const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        const isChrome = !!window.chrome;
        const isWeird = isSafari || isChrome;
        let counter;
        if (!!maxlength) {
            let length = 0;
            if (value) {
                length = isWeird ? value.replace(/(\r\n|\n|\r)/g, '-').length : value.length;
            }
            let progress = 0;
            if (maxlength) {
                progress = length / maxlength;
            }
            const ariaLevel = progress > 0.75 ? 'polite' : 'off';
            const lengthClasses = classNames({
                [toolkitstyles['safetextarea__char-counter__length']]: true,
                [toolkitstyles['safetextarea__char-counter__length--invalid']]: !!maxlength && length > maxlength,
            });
            counter = (React.createElement("div", { className: `${toolkitstyles['safetextarea__char-counter']}${!!charCounterClasses ? ` ${charCounterClasses}` : ''}`, "aria-live": ariaLevel, "aria-atomic": "true" },
                React.createElement("span", { className: lengthClasses }, length),
                React.createElement("span", { "aria-hidden": "true" }, counterPrefixText),
                React.createElement("span", { className: toolkitstyles['safetextarea__char-counter__hidden-text'] }, counterInfixText),
                maxlength,
                React.createElement("span", { className: toolkitstyles['safetextarea__char-counter__hidden-text'] }, counterSuffixText)));
        }
        let required = false;
        if (isRequired) {
            required = isRequired;
        }
        const textAreaClasses = classNames({
            [toolkitstyles.safetextarea__textarea]: true,
            [toolkitstyles['safetextarea__textarea--state_validationerror']]: !valid && validated,
            [toolkitstyles['safetextarea__textarea--small']]: size === 'small',
            [toolkitstyles['safetextarea__textarea--medium']]: size === 'medium',
            [toolkitstyles['safetextarea__textarea--large']]: size === 'large',
        });
        const classes = classNames('mol_validation', { 'mol_validation--active': !valid && validated }, wrapperClasses);
        const ariaInvalid = {};
        if (validated) {
            ariaInvalid['aria-invalid'] = !valid;
        }
        return (React.createElement("div", { className: classes, id: `${id}-wrapper` },
            this.renderErrorMessage(),
            this.renderLabel(),
            this.renderHelp(),
            React.createElement("textarea", Object.assign({ id: id, ref: this.textareaRef, value: value || '', className: textAreaClasses, style: { resize: 'none' }, minLength: minlength, rows: rows, placeholder: placeholder, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, 
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus: autoFocus, disabled: disabled, required: required, "aria-required": required, "aria-label": ariaLabel, "data-testid": this.props.testId, readOnly: readOnly }, ariaInvalid)),
            React.createElement("div", { className: toolkitstyles['safetextarea__printable-textarea-content'] }, value),
            counter,
            children));
    }
}
SafeTextarea.hnFormComponent = true;
export { SafeTextarea };
export default SafeTextarea;
//# sourceMappingURL=index.js.map