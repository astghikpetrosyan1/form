import * as React from 'react';
import classNames from 'classnames';
import { CheckBox } from '../checkbox';
import ValidationError from '../form/validation-error';
import { Sublabel } from '../label/sublabel';
// @ts-ignore
import NoImage from "../../img/no-image.jpg";
import { fileType, IExtentionType } from '../../utility/utils';
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
    renderImage() {
        var _a, _b;
        const showMainImage = this.props.extension ? (_a = this.props.extension.find((extension) => extension.url === IExtentionType.showMainImage)) === null || _a === void 0 ? void 0 : _a.valueBoolean : false;
        const mainImage = this.props.extension ? (_b = this.props.extension.find((extension) => extension.url === IExtentionType.mainImage)) === null || _b === void 0 ? void 0 : _b.valueString : "";
        return showMainImage ? (React.createElement("div", null, !mainImage ? (React.createElement("img", { src: NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(mainImage) === 'image' ? (React.createElement("img", { src: mainImage || NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(mainImage) === 'video' ? (React.createElement("video", { controls: true, style: { width: '100%' } },
            React.createElement("source", { src: mainImage, type: "video/mp4" }),
            "Your browser does not support the video tag.")) : null)) : null;
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
        var _a;
        const { validateOnExternalUpdate } = this.props;
        const showChoiceImage = this.props.extension ? (_a = this.props.extension.find((extension) => extension.url === IExtentionType.choiceImage)) === null || _a === void 0 ? void 0 : _a.valueBoolean : false;
        const checkboxes = this.props.checkboxes.map(el => {
            var _a;
            const choiceImage = el.extension ? (_a = el.extension.find((extension) => extension.url === IExtentionType.image)) === null || _a === void 0 ? void 0 : _a.valueString : "";
            return (React.createElement("div", { key: el.id, className: "choice-image-card" },
                showChoiceImage ? (React.createElement("div", { className: "file-list" }, !choiceImage ? (React.createElement("img", { src: NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(choiceImage) === 'image' ? (React.createElement("img", { src: choiceImage || NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(choiceImage) === 'video' ? (React.createElement("video", { controls: true, style: { width: '100%' } },
                    React.createElement("source", { src: choiceImage, type: "video/mp4" }),
                    "Your browser does not support the video tag.")) : null)) : null,
                React.createElement("div", { className: "checkbox-container" },
                    React.createElement(CheckBox, { label: el.label, id: `${this.props.id}-${el.id}`, checked: el.checked, onChange: () => this.props.handleChange(el.id), helpButton: el.hjelpetrigger, disabled: el.disabled, validateOnExternalUpdate: validateOnExternalUpdate, checkboxTestId: `${this.props.checkboxTestId}-${el.id}`, isStyleBlue: this.props.isStyleBlue }))));
        });
        const classes = classNames({ 'mol_validation--active': !this.state.valid }, this.props.className);
        return (React.createElement("div", { className: `mol_validation ${classes}`, id: `${this.props.id}-wrapper` },
            React.createElement(ValidationError, { isValid: this.state.valid, error: this.props.errorMessage ? this.props.errorMessage : '', testId: this.props.validationTestId }),
            React.createElement("fieldset", { className: this.props.fieldsetClassName, "data-testid": this.props.checkboxTestId },
                this.renderLegend(),
                this.renderHelp(),
                this.renderImage(),
                React.createElement("div", { className: "group-container" }, this.props.hasInnerWrapper ? React.createElement("div", { className: "atom_checkboxgroup__innerwrap" }, checkboxes) : checkboxes))));
    }
}
//# sourceMappingURL=index.js.map