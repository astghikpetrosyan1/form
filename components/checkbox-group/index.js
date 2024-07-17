import * as React from 'react';
import classNames from 'classnames';
import { CheckBox } from '../checkbox';
import ValidationError from '../form/validation-error';
import { Sublabel } from '../label/sublabel';
// @ts-ignore
import NoImage from "../../img/no-image.jpg";
export default class CheckBoxGroup extends React.Component {
    constructor(props) {
        super(props);
        this.validate = (validated) => {
            if (this.props.isRequired && validated && !this.props.checkboxes.some(el => el.checked === true)) {
                return false;
            }
            else if (this.props.max && this.props.checkboxes.filter(el => el.checked === true).length > this.props.max) {
                return false;
            }
            else if (this.props.min && validated && this.props.checkboxes.filter(el => el.checked === true).length < this.props.min) {
                return false;
            }
            return true;
        };
        this.notifyValidated = () => {
            if (this.props.onValidated) {
                this.props.onValidated(this.state.valid);
            }
        };
        this.state = {
            valid: true,
            validated: false,
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.checkboxes !== this.props.checkboxes) {
            this.setState({ valid: this.validate(this.state.validated) }, this.notifyValidated);
        }
    }
    validateField() {
        const valid = this.validate(true);
        return new Promise((resolve) => {
            this.setState({ validated: true, valid }, () => {
                this.notifyValidated();
                resolve();
            });
        });
    }
    isValid() {
        return this.state.valid;
    }
    renderHelp() {
        if (this.props.helpElement) {
            return this.props.helpElement;
        }
    }
    renderLegend() {
        const { legend, legendClassName, isRequired, requiredLabel, optionalLabel, showRequiredLabel, showOptionalLabel, helpButton, subLabel, } = this.props;
        if (!legend) {
            return null;
        }
        return (React.createElement("legend", { className: legendClassName },
            legend,
            isRequired && requiredLabel && showRequiredLabel ? React.createElement("em", null,
                " ",
                requiredLabel) : '',
            !isRequired && optionalLabel && showOptionalLabel ? React.createElement("em", null,
                " ",
                optionalLabel) : '',
            helpButton,
            subLabel && React.createElement(Sublabel, { sublabelText: subLabel })));
    }
    render() {
        const { validateOnExternalUpdate } = this.props;
        const checkboxes = this.props.checkboxes.map(el => {
            return (React.createElement("div", { key: el.id, className: "choice-image-card" },
                this.props.choiceImage ? (React.createElement("div", null,
                    React.createElement("img", { src: el.image || NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } }))) : null,
                React.createElement("div", { className: "checkbox-container" },
                    React.createElement(CheckBox, { label: el.label, id: `${this.props.id}-${el.id}`, checked: el.checked, onChange: () => this.props.handleChange(el.id), helpButton: el.hjelpetrigger, disabled: el.disabled, validateOnExternalUpdate: validateOnExternalUpdate, checkboxTestId: `${this.props.checkboxTestId}-${el.id}`, isStyleBlue: this.props.isStyleBlue }))));
        });
        const classes = classNames({ 'mol_validation--active': !this.state.valid }, this.props.className);
        return (React.createElement("div", { className: `mol_validation ${classes}`, id: `${this.props.id}-wrapper` },
            React.createElement(ValidationError, { isValid: this.state.valid, error: this.props.errorMessage ? this.props.errorMessage : '', testId: this.props.validationTestId }),
            React.createElement("fieldset", { className: this.props.fieldsetClassName, "data-testid": this.props.checkboxTestId },
                this.renderLegend(),
                this.renderHelp(),
                React.createElement("div", { className: "group-container" }, this.props.hasInnerWrapper ? React.createElement("div", { className: "atom_checkboxgroup__innerwrap" }, checkboxes) : checkboxes))));
    }
}
//# sourceMappingURL=index.js.map