import * as React from 'react';
import classNames from 'classnames';
import Loader from '@helsenorge/designsystem-react/components/Loader';
import ValidationError from '../form/validation-error';
import { Label } from '../label';
import './styles.scss';
/**
 * Dette tekstinputfeltet kan trygt motta nye props fra parent uten at verdien i inputfeltet overskrives
 * hvis feltet redigeres akkurat idet de nye propene sendes inn fra parent. Endringer av feltet blir
 * sendt til parent ved onBlur.
 */
class SafeInputField extends React.Component {
    constructor(props) {
        super(props);
        this.renderLabel = () => {
            if (this.props.label !== undefined) {
                const labelText = (React.createElement(React.Fragment, null,
                    this.props.label,
                    this.props.isRequired && this.props.requiredLabel && this.props.showRequiredLabel ? React.createElement("em", null,
                        " ",
                        this.props.requiredLabel) : '',
                    !this.props.isRequired && this.props.optionalLabel && this.props.showOptionalLabel ? React.createElement("em", null,
                        " ",
                        this.props.optionalLabel) : ''));
                return (React.createElement(Label, { labelText: labelText, htmlFor: this.props.inputName, sublabelText: this.props.subLabel, testId: this.props.labelTestId, helpButton: this.props.helpButton }));
            }
            return null;
        };
        this.state = {
            focused: false,
            isValid: true,
            value: undefined,
            validated: false,
            loading: false,
            dirtyInput: false,
            handleValidation: false,
            propValue: undefined, // Kopi av prop.value som brukes til å sammenlikne value-endringer
        };
        this.inputFieldRef = React.createRef();
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.notifyChanged = this.notifyChanged.bind(this);
        this.notifyValidated = this.notifyValidated.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.focus = this.focus.bind(this);
        this.isTypeNumber = this.isTypeNumber.bind(this);
        this.validate = this.validate.bind(this);
        this.validateNumber = this.validateNumber.bind(this);
        this.validateField = this.validateField.bind(this);
        this.isValidIfRequired = this.isValidIfRequired.bind(this);
        this.isValid = this.isValid.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
        this.getInputClasses = this.getInputClasses.bind(this);
    }
    componentDidMount() {
        const { value } = this.props;
        this.setState({ value, propValue: value }, () => {
            if (value === '' || value === null || value === undefined) {
                return;
            }
            else {
                // Kjør alle valideringsfunksjoner
                if (!this.validate(value)) {
                    this.setState({ isValid: false, validated: true });
                }
                else if (this.props.onChangeValidator && !this.props.onChangeValidator(value)) {
                    this.setState({ isValid: false, validated: true });
                }
                else if (this.props.onBlurValidator) {
                    this.props.onBlurValidator(value).then(isValid => {
                        this.setState({ isValid, validated: true });
                    });
                }
            }
        });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const updatedState = Object.assign({}, prevState);
        const hasPropChanged = nextProps.value !== prevState.propValue;
        if (hasPropChanged)
            updatedState.propValue = nextProps.value;
        if (nextProps.validateOnExternalUpdate && prevState.propValue !== prevState.value) {
            const valueString = updatedState.propValue;
            const compareValueString = prevState.propValue;
            let formattedValue = valueString;
            let compareFormattedValue = compareValueString;
            if (nextProps.onChangeFormatter) {
                formattedValue = nextProps.onChangeFormatter(formattedValue);
                compareFormattedValue = nextProps.onChangeFormatter(compareFormattedValue);
            }
            if (compareFormattedValue !== prevState.value && hasPropChanged) {
                // Input har endret seg. Dirtyinput = ikke validert
                updatedState.value = formattedValue;
                updatedState.dirtyInput = true;
                updatedState.handleValidation = true;
            }
            return updatedState === prevState ? null : updatedState;
        }
        if (hasPropChanged && updatedState.propValue !== prevState.value) {
            updatedState.value = updatedState.propValue;
            updatedState.dirtyInput = true;
            updatedState.handleValidation = true;
        }
        return updatedState === prevState ? null : updatedState;
    }
    componentDidUpdate(_prevProps, prevState) {
        if (this.state.handleValidation) {
            const valueString = this.state.value;
            this.handleValidation(valueString, valueString);
            this.setState({ handleValidation: false });
        }
        if (prevState.isValid !== this.state.isValid) {
            this.notifyValidated();
        }
    }
    onChange(e) {
        const value = e.target.value;
        this.handleChange(value, formattedValue => this.notifyChanged(e, formattedValue));
    }
    handleChange(value, notify) {
        let formattedValue = value;
        if (this.props.onChangeFormatter) {
            formattedValue = this.props.onChangeFormatter(value);
        }
        if (formattedValue !== this.state.value) {
            // Input har endret seg. Dirtyinput = ikke validert
            this.setState({ value: formattedValue, dirtyInput: true });
            this.handleValidation(value, formattedValue, notify);
        }
    }
    handleValidation(value, formattedValue, notify) {
        if (!this.validate(formattedValue)) {
            this.setState({ isValid: false });
        }
        else if (this.props.onChangeValidator && this.state.validated) {
            this.setState({ isValid: this.props.onChangeValidator(value) });
        }
        else {
            this.setState({ isValid: true });
        }
        if (notify) {
            notify(formattedValue);
        }
        if (!formattedValue || this.isValueOverMaxLength(formattedValue)) {
            this.setState({
                validated: !formattedValue ? false : true,
            });
        }
    }
    notifyChanged(e, formattedValue) {
        if (this.props.onChange) {
            this.props.onChange(e, this.props.id, formattedValue);
        }
    }
    notifyValidated() {
        if (this.props.onValidated) {
            this.props.onValidated(this.state.isValid);
        }
    }
    onMouseDown() {
        if (this.props.type !== 'number') {
            return;
        }
        if (this.state.focused) {
            return;
        }
        // Firefox does not focus number input field on click on arrow buttons
        this.focus();
    }
    onFocus(e) {
        this.setState({ focused: true });
        if (this.props.onFocus) {
            this.props.onFocus(e, this.props.id);
        }
    }
    onBlur(e) {
        e.persist();
        const value = e.target.value;
        this.setState({ focused: false });
        let state = null;
        if (this.state.dirtyInput) {
            if (!this.validate(value)) {
                state = { isValid: false, validated: true, dirtyInput: false };
            }
            else if (typeof value === 'string' && this.props.minLength && value && value.length < this.props.minLength) {
                state = { isValid: false, validated: true, dirtyInput: false };
            }
            else if (value !== '' && this.props.onChangeValidator && !this.props.onChangeValidator(value)) {
                state = { isValid: false, validated: true, dirtyInput: false };
            }
            else if (value !== '' && this.props.onBlurValidator) {
                state = {
                    loading: true,
                    onBlurValidationPromise: this.props.onBlurValidator(value),
                };
            }
        }
        if (state) {
            this.setState(state, () => {
                if (this.props.onBlurValidator && this.state.onBlurValidationPromise) {
                    this.state.onBlurValidationPromise.then(isValid => {
                        this.setState({
                            isValid,
                            validated: true,
                            loading: false,
                            dirtyInput: false,
                            onBlurValidationPromise: undefined,
                        });
                    });
                }
                if (this.props.onBlur) {
                    this.props.onBlur(e);
                }
            });
        }
        else {
            if (this.props.onBlur) {
                this.props.onBlur(e);
            }
        }
    }
    focus() {
        if (this.inputFieldRef.current)
            this.inputFieldRef.current.focus();
    }
    isTypeNumber() {
        return this.props.type === 'number' || this.props.type === 'tel';
    }
    validate(value) {
        if (this.isTypeNumber() && !this.validateNumber(value)) {
            return false;
        }
        if (typeof value === 'string' && !this.state.isValid && this.props.minLength && value && value.length < this.props.minLength) {
            return false;
        }
        if (this.isValueOverMaxLength(value)) {
            return false;
        }
        if (this.props.pattern && value) {
            const regexp = new RegExp(this.props.pattern);
            if (!regexp.test(value.toString())) {
                return false;
            }
        }
        return true;
    }
    isValueOverMaxLength(value) {
        return typeof value === 'string' && this.props.maxLength && value && value.length > this.props.maxLength;
    }
    validateNumber(value) {
        const { min, max } = this.props;
        if (!value) {
            return true;
        }
        if (min !== null && min !== undefined && value < min) {
            return false;
        }
        if (max !== null && max !== undefined && value > max) {
            return false;
        }
        return true;
    }
    // Denne funksjonen blir kalt på submit i form.
    validateField() {
        return new Promise((resolve) => {
            if (this.props.onSubmitValidator) {
                this.setState({
                    isValid: this.props.onSubmitValidator(this.state.value),
                    validated: true,
                });
                resolve();
            }
            else if (!this.isValidIfRequired()) {
                this.setState({ isValid: false, validated: true });
                resolve();
            }
            else if (this.state.onBlurValidationPromise) {
                // Onblurvalidering på gang, vi må vente til den er ferdig før vi vet om form er gyldig
                this.state.onBlurValidationPromise.then(() => {
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    }
    isValidIfRequired() {
        if (this.props.isRequired) {
            return this.state.value !== null && this.state.value !== undefined && this.state.value.toString().trim() !== '';
        }
        return true;
    }
    isValid() {
        return this.state.isValid;
    }
    renderErrorMessage() {
        if (this.props.isValidationHidden) {
            return null;
        }
        if (this.props.validationErrorRenderer && !this.state.isValid) {
            return this.props.validationErrorRenderer;
        }
        let error = '';
        if (!this.state.isValid) {
            if (this.props.isRequired && !this.isValidIfRequired() && this.props.requiredErrorMessage) {
                error =
                    typeof this.props.requiredErrorMessage === 'string'
                        ? this.props.requiredErrorMessage
                        : this.props.requiredErrorMessage(this.state.value);
            }
            else if (this.props.errorMessage) {
                error = typeof this.props.errorMessage === 'string' ? this.props.errorMessage : this.props.errorMessage(this.state.value);
            }
            else {
                error = 'Ugyldig verdi';
            }
            if (this.isValueOverMaxLength(this.state.value)) {
                error = this.props.stringOverMaxLengthError
                    ? this.props.stringOverMaxLengthError
                    : 'Du har skrevet for mange tegn. Gjør teksten kortere.';
            }
        }
        return React.createElement(ValidationError, { isValid: this.state.isValid, error: error, testId: this.props.validationTestId });
    }
    createMarkup(htmlString) {
        return { __html: htmlString };
    }
    getInputClasses() {
        if (this.props.maxLength) {
            const max = this.props.maxLength > 40 ? 40 : this.props.maxLength;
            return `atom_input--${max}`;
        }
        else if (this.props.max && (this.props.type === 'number' || this.props.type === 'tel')) {
            const length = this.props.max.toString().length;
            return `atom_input--${length}`;
        }
        else {
            return '';
        }
    }
    render() {
        const { className, disabled, size, blurSpinnerAlignment, keepDefaultSize, isRequired, id, inputName, tabIndex, min, max, minLength, type, wrapperClasses, isValidationHidden, placeholder, onKeyDown, ariaLabel, ariaLabelledby, ariaRequired, inputProps, readOnly, helpElement, autocomplete, inputTestId, sufix, prefix, } = this.props;
        const { value, isValid, validated, loading } = this.state;
        const inputValue = typeof value === 'string' ? value : value ? value.toString() : '';
        const inputClasses = classNames('hn-safe-input', 'atom_input', className, {
            'safeInputFieldError atom_input--state_validationerror': validated && !isValid,
            'atom_input--xsmall': size === 'xSmall',
            'atom_input--small': size === 'small',
            'atom_input--medium': size === 'medium',
            'atom_input--large': size === 'large',
            'atom_input--xlarge': size === 'xLarge',
            atom_input: size === 'fullSize',
            'atom_input--loading': loading,
            'atom_input--spinnerright': blurSpinnerAlignment === 'right',
            'atom_input--disabled': disabled,
        }, keepDefaultSize ? '' : this.getInputClasses());
        const classes = classNames('safeInputField', wrapperClasses, {
            mol_validation: !isValidationHidden,
            'mol_validation--active': !isValidationHidden && validated && !isValid,
        });
        let required = false;
        if (isRequired) {
            required = isRequired;
        }
        const ariaInvalid = {};
        if (validated) {
            ariaInvalid['aria-invalid'] = validated && !isValid;
        }
        return (React.createElement("div", { className: classes, id: `${id}-wrapper` },
            this.renderErrorMessage(),
            this.renderLabel(),
            helpElement ? helpElement : null,
            type === 'range' ? (React.createElement("span", { className: "refero-range-value" }, inputValue)) : null,
            React.createElement("span", { className: `refero-${type}-input` },
                prefix,
                React.createElement("input", Object.assign({ ref: this.inputFieldRef, id: inputName, name: inputName, type: type ? type : 'text', value: inputValue, placeholder: placeholder, className: inputClasses, min: min, max: max, minLength: minLength, autoComplete: autocomplete || 'off', tabIndex: tabIndex, "data-testid": inputTestId, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onKeyDown: onKeyDown, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, "aria-required": ariaRequired || required, required: required, disabled: disabled, readOnly: readOnly }, inputProps, ariaInvalid)),
                sufix,
                loading ? React.createElement(Loader, { overlay: "parent", size: "small", className: "atom_input__loader" }) : null),
            this.props.children));
    }
}
SafeInputField.hnFormComponent = true;
SafeInputField.defaultProps = {
    id: undefined,
    onBlur: undefined,
    value: undefined,
    showRequiredLabel: true,
    readOnly: false,
    size: 'medium',
    blurSpinnerAlignment: 'left',
    isValidationHidden: false,
};
export default SafeInputField;
//# sourceMappingURL=index.js.map