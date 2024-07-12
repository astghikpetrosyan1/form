import * as React from 'react';
import classNames from 'classnames';
import CheckThick from './CheckThick';
import ValidationError from '../form/validation-error';
import './styles.scss';
class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = (event) => {
            this.handleOnChange(!this.props.checked, () => this.props.onChange(event));
        };
        this.handleOnChange = (checked, notify) => {
            this.validate(checked, true);
            if (notify) {
                notify();
            }
        };
        this.inputRef = React.createRef();
        this.state = {
            valid: true,
            validated: false,
        };
    }
    componentDidMount() {
        this.setChecked();
    }
    componentDidUpdate(prevProps) {
        this.setChecked();
        if (this.props.validateOnExternalUpdate && prevProps.checked !== this.props.checked) {
            this.handleOnChange(this.props.checked);
        }
    }
    setChecked() {
        const $checkbox = this.inputRef.current;
        if ($checkbox) {
            this.props.checked ? $checkbox.setAttribute('checked', 'checked') : $checkbox.removeAttribute('checked');
        }
    }
    validateField() {
        this.setState({ validated: true });
        return this.validate(this.props.checked, false);
    }
    validate(value, notifyValidated) {
        return new Promise((resolve) => {
            const validatedCB = () => {
                if (notifyValidated) {
                    this.notifyValidated();
                }
                resolve();
            };
            if (this.props.isRequired) {
                this.setState({ valid: value === true }, validatedCB);
            }
            else {
                this.setState({ valid: true }, validatedCB);
            }
        });
    }
    isValid() {
        return this.state.valid;
    }
    notifyValidated() {
        if (this.props.onValidated) {
            this.props.onValidated(this.state.valid);
        }
    }
    renderHelp() {
        if (this.props.helpElement) {
            return this.props.helpElement;
        }
        return null;
    }
    render() {
        const { isStyleBlue, isStyleBoxed, labelClassName, checked, disabled, checkboxTestId, labelTestId, validationTestId } = this.props;
        const labelClasses = classNames({
            'atom_checkbox__label--boxed': isStyleBoxed,
            'atom_checkbox__label--checked': checked,
        }, labelClassName);
        const checkiconClasses = classNames({
            'atom_checkbox__checkicon--lilla': !isStyleBlue,
            'atom_checkbox__checkicon--blue': isStyleBlue,
            'atom_checkbox__checkicon--boxed': isStyleBoxed,
            'atom_checkbox__checkicon--checked': checked,
            'atom_checkbox__checkicon--disabled': disabled,
        });
        const textClasses = classNames({
            'atom_checkbox__text--checked': checked,
        });
        const wrapperClasses = classNames({ 'mol_validation--active': !this.state.valid }, this.props.className);
        const comment = this.props.comment ? (React.createElement("span", { className: "atom_checkbox__comment" }, this.props.comment)) : (false);
        return (React.createElement("div", { className: `mol_validation atom_checkbox ${wrapperClasses}`, id: `${this.props.id}-wrapper` },
            React.createElement(ValidationError, { isValid: this.state.valid, error: this.props.errorMessage ? this.props.errorMessage : '', testId: validationTestId }),
            React.createElement("div", { className: "atom_checkbox__labelwrapper" },
                React.createElement("input", { ref: this.inputRef, type: "checkbox", checked: this.props.checked, id: this.props.id, onChange: this.onChange, disabled: this.props.disabled, className: `atom_checkbox__input`, "data-testid": checkboxTestId }),
                React.createElement("label", { htmlFor: this.props.id, className: `atom_checkbox__label ${labelClasses}`, "data-testid": labelTestId },
                    React.createElement(CheckThick, { size: "small", tabIndex: -1, className: `atom_checkbox__checkicon ${checkiconClasses}` }),
                    React.createElement("span", { className: `atom_checkbox__text ${textClasses}` }, this.props.label),
                    comment),
                this.props.helpButton ? React.createElement("span", { className: "atom_helptrigger-container" }, this.props.helpButton) : null),
            this.renderHelp(),
            this.props.children));
    }
}
CheckBox.hnFormComponent = true;
export { CheckBox };
//# sourceMappingURL=index.js.map