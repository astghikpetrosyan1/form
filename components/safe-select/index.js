import * as React from 'react';
import classNames from 'classnames';
import ValidationError from '../form/validation-error';
import { Label } from '../label';
import './styles.scss';
class SafeSelectField extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = (e) => {
            const value = e.target.value;
            let formattedValue = value;
            if (this.props.onChangeFormatter) {
                formattedValue = this.props.onChangeFormatter(value);
            }
            if (this.state.validated) {
                this.setState({ value: formattedValue }, this.validateField);
            }
            else {
                this.setState({ value: formattedValue }, this.validateField);
            }
            this.notifyChanged(e);
        };
        this.notifyChanged = (e) => {
            if (this.props.onChange) {
                this.props.onChange(e, this.props.id);
            }
        };
        this.notifyValidated = () => {
            if (this.props.onValidated) {
                this.props.onValidated(this.state.isValid);
            }
        };
        this.onFocus = (e) => {
            if (this.props.onFocus) {
                this.props.onFocus(e, this.props.id);
            }
        };
        this.focus = () => {
            if (this.selectElementRef.current) {
                this.selectElementRef.current.focus();
            }
        };
        this.getOptionWithValue = (value) => {
            if (!this.props.options || !value) {
                return undefined;
            }
            const filteredOptions = this.props.options.filter((o) => o.value === value);
            if (!filteredOptions || filteredOptions.length === 0) {
                return undefined;
            }
            return filteredOptions[0];
        };
        this.validateField = () => {
            return new Promise((resolve) => {
                const validatedCB = () => {
                    this.notifyValidated();
                    resolve();
                };
                const value = this.state.value;
                if (this.props.onChangeValidator && this.props.isRequired) {
                    this.setState({ validated: true, isValid: this.props.onChangeValidator(value) }, validatedCB);
                    return;
                }
                let valid = false;
                if (this.props.isRequired) {
                    if (this.getOptionWithValue(value)) {
                        valid = true;
                    }
                }
                else {
                    valid = true;
                }
                this.setState({ validated: true, isValid: valid }, validatedCB);
            });
        };
        this.isValid = () => {
            return this.state.isValid;
        };
        this.renderErrorMessage = () => {
            if (this.props.validationErrorRenderer && !this.state.isValid) {
                return this.props.validationErrorRenderer;
            }
            let error;
            if (this.props.errorMessage) {
                error = typeof this.props.errorMessage === 'string' ? this.props.errorMessage : this.props.errorMessage(this.state.value);
            }
            else {
                error = 'Ugyldig verdi';
            }
            return React.createElement(ValidationError, { isValid: this.state.isValid, error: error, testId: this.props.validationTestId });
        };
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
                return (React.createElement(Label, { labelText: labelText, htmlFor: this.props.selectName, sublabelText: this.props.subLabel, className: this.props.showLabelLeft ? 'atom_label--showleft' : '', testId: this.props.labelTestId, helpButton: this.props.helpButton }));
            }
            return null;
        };
        this.selectElementRef = React.createRef();
        this.state = {
            isValid: true,
            value: undefined,
            validated: false,
        };
    }
    componentDidMount() {
        const { selected, value } = this.props;
        //value kom ikke inn som prop på et bruk av nedtrekksliste, men selected gjør. Legger opp til bruk av begge.
        const compatibleValue = value ? value : selected;
        if (compatibleValue === '' || compatibleValue === null || compatibleValue === undefined) {
            return;
        }
        this.setState({ value: compatibleValue });
        if (this.props.onChangeValidator) {
            this.setState({ isValid: this.props.onChangeValidator(compatibleValue) });
        }
        if (value) {
            this.setState({ value }, () => {
                if (value === '' || value === null || value === undefined) {
                    return;
                }
                else {
                    this.validateField();
                }
            });
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const updatedState = Object.assign({}, prevState);
        if (nextProps.value && nextProps.value !== prevState.value) {
            updatedState.value = nextProps.value;
            return updatedState;
        }
        else {
            return null;
        }
    }
    render() {
        const { className, disabled, selected, isRequired, placeholder, selectName } = this.props;
        const firstOption = this.props.options ? this.props.options[0] : undefined;
        const firstValue = firstOption ? firstOption.value : undefined;
        const selectedValue = this.state.value ? this.state.value : placeholder ? placeholder.value : firstValue;
        const selectClassNames = classNames('atom_select__select', className, {
            ['atom_select__select--haslabelleft']: this.props.showLabelLeft,
            ['atom_select__select--state_validationerror']: !this.state.isValid,
        });
        let wrapperClasses = `mol_validation ${this.props.wrapperClasses ? this.props.wrapperClasses : ''}`;
        if (!this.state.isValid) {
            wrapperClasses += ' mol_validation--active';
        }
        const ariaInvalid = this.state.validated ? { 'aria-invalid': !this.state.isValid } : {};
        const options = [];
        if (placeholder && !this.props.showLabelLeft) {
            options.push(React.createElement("option", { key: 'placeholder', value: placeholder.value, disabled: true, hidden: navigator.platform.toUpperCase().indexOf('MAC') === -1, "aria-selected": selectedValue === placeholder.value }, placeholder.text));
        }
        if (this.props.options) {
            this.props.options.forEach(function (item, index) {
                options.push(React.createElement("option", { key: index, value: item.value, "aria-selected": selectedValue === item.value }, item.text));
            });
        }
        return (React.createElement("div", { className: wrapperClasses, id: `${this.props.id}-wrapper` },
            this.renderErrorMessage(),
            this.renderLabel(),
            this.props.helpElement ? this.props.helpElement : null,
            React.createElement("span", { className: 'atom_select' },
                React.createElement("select", Object.assign({ ref: this.selectElementRef, id: selectName, name: selectName, value: selected ? selected : selectedValue, tabIndex: this.props.tabIndex, "data-testid": this.props.selectTestId, className: selectClassNames, disabled: disabled, required: !!isRequired, onChange: this.onChange, onFocus: this.onFocus, onKeyDown: this.props.onKeyDown, "aria-label": this.props.ariaLabel, "aria-labelledby": this.props.ariaLabelledby, "aria-required": this.props.ariaRequired || !!isRequired }, ariaInvalid), options)),
            this.props.children));
    }
}
SafeSelectField.hnFormComponent = true;
SafeSelectField.defaultProps = {
    id: '',
    showRequiredLabel: true,
    showLabelLeft: false,
};
export default SafeSelectField;
//# sourceMappingURL=index.js.map