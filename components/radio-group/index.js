import * as React from 'react';
import classNames from 'classnames';
import PrivateRadioGroup from './private-radio-group';
import ValidationError from '../form/validation-error';
import { Sublabel } from '../label/sublabel';
import './styles.scss';
// @ts-ignore
import NoImage from '../../img/no-image.jpg';
import { fileType, IExtentionType } from '../../utility/utils';
class RadioGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeSelectedValue = this.changeSelectedValue.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.notifyValidated = this.notifyValidated.bind(this);
        this.state = {
            // Get from soknadsstore
            lastFocusedValue: props.selected,
            valid: true,
            validated: false,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const updatedState = Object.assign({}, prevState);
        if (nextProps.validateOnExternalUpdate && nextProps.selected && nextProps.selected !== prevState.lastFocusedValue) {
            updatedState.lastFocusedValue = nextProps.selected;
            updatedState.shouldValidate = true;
        }
        else {
            updatedState.lastFocusedValue = nextProps.selected;
        }
        return updatedState;
    }
    componentDidUpdate(_prevProps, prevState) {
        if (this.state.shouldValidate) {
            this.validate(this.state.lastFocusedValue);
            this.setState({ shouldValidate: false });
        }
        if (prevState.valid !== this.state.valid) {
            this.notifyValidated();
        }
    }
    onChange(e) {
        const element = document.getElementById(e.target.htmlFor);
        if (element) {
            e.target = element;
            if (e.target.disabled) {
                return;
            }
            this.changeSelectedValue(e.target.value, (v) => this.props.onChange(v));
        }
    }
    onClick(e) {
        this.changeSelectedValue(e.target.value, (v) => this.props.onChange(v));
    }
    changeSelectedValue(value, notify) {
        if (value === this.state.lastFocusedValue) {
            return;
        }
        if (notify) {
            notify(value);
        }
        this.setState({ lastFocusedValue: value });
        this.validate(value);
    }
    validate(value) {
        return new Promise((resolve) => {
            const validatedCB = () => {
                resolve();
            };
            if (this.props.isRequired) {
                if (this.props.validator) {
                    this.setState({ valid: this.props.validator(value) }, validatedCB);
                    return;
                }
                const empty = value === null || value === undefined || value === '';
                this.setState({ valid: !empty }, validatedCB);
            }
            else {
                this.setState({ valid: true }, validatedCB);
            }
        });
    }
    notifyValidated() {
        if (this.props.onValidated) {
            this.props.onValidated(this.state.valid);
        }
    }
    validateField() {
        this.setState({ validated: true });
        return this.validate(this.state.lastFocusedValue);
    }
    isValid() {
        return this.state.valid;
    }
    renderErrorMessage() {
        if (!this.props.getErrorMessage) {
            return null;
        }
        const errorMessage = this.state.lastFocusedValue
            ? this.props.getErrorMessage(this.state.lastFocusedValue)
            : this.props.getErrorMessage('');
        return React.createElement(ValidationError, { isValid: this.state.valid, error: errorMessage });
    }
    renderLegend() {
        if (!this.props.legend) {
            return null;
        }
        return (React.createElement("legend", { className: this.props.legendClassName ? this.props.legendClassName : '' },
            this.props.legend,
            this.props.isRequired && this.props.requiredLabel && this.props.showRequiredLabel ? React.createElement("em", null,
                " ",
                this.props.requiredLabel) : '',
            !this.props.isRequired && this.props.optionalLabel && this.props.showOptionalLabel ? React.createElement("em", null,
                " ",
                this.props.optionalLabel) : '',
            this.props.helpButton,
            this.props.subLabel && React.createElement(Sublabel, { sublabelText: this.props.subLabel })));
    }
    isRadioValid(value) {
        if (this.props.isRequired && this.state.lastFocusedValue === null) {
            return false;
        }
        if (value === this.state.lastFocusedValue && !this.state.valid) {
            return false;
        }
        return true;
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
        return showMainImage ? (React.createElement("div", { className: "file-list" }, !mainImage ? (React.createElement("img", { src: NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(mainImage) === 'image' ? (React.createElement("img", { src: mainImage || NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(mainImage) === 'video' ? (React.createElement("video", { controls: true, style: { width: '100%' } },
            React.createElement("source", { src: mainImage, type: "video/mp4" }),
            "Your browser does not support the video tag.")) : null)) : null;
    }
    render() {
        const { id, testId, options, wrapperClassName, fieldsetClassName, labelClassName, selected, isRequired, isStyleBlue, isStyleBoxed, noFieldset, ariaLabelledBy, labelStringFetcher, children, } = this.props;
        const { valid, validated } = this.state;
        const inputClasses = classNames({
            'atom_radio__input--boxed': !isStyleBoxed,
        });
        const inputFields = options.map((e, i) => {
            var _a, _b;
            const inputId = id + '-hn-' + i;
            let label = e.label;
            const labelClasses = classNames({
                'atom_radio__label--checked': e.type === selected,
                'atom_radio__label--boxed': isStyleBoxed,
            }, labelClassName);
            const checkiconClasses = classNames({
                'atom_radio__checkicon--lilla': !isStyleBlue,
                'atom_radio__checkicon--blue': isStyleBlue,
                'atom_radio__checkicon--boxed': isStyleBoxed,
                'atom_radio__checkicon--checked': e.type === selected,
                'atom_radio__checkicon--disabled': e.disabled,
            });
            const textClasses = classNames({
                'atom_radio__text--checked': e.type === selected,
            });
            if (labelStringFetcher) {
                label = labelStringFetcher(label);
            }
            const ariaInvalid = {};
            if (validated) {
                ariaInvalid['aria-invalid'] = !this.isRadioValid(e.type);
            }
            const showChoiceImage = this.props.extension ? (_a = this.props.extension.find((extension) => extension.url === IExtentionType.choiceImage)) === null || _a === void 0 ? void 0 : _a.valueBoolean : false;
            const image = e.extension ? (_b = e.extension.find((extension) => extension.url === IExtentionType.image)) === null || _b === void 0 ? void 0 : _b.valueString : "";
            return (React.createElement("div", { key: inputId, className: "choice-image-card" },
                showChoiceImage ? (React.createElement("div", null, !image ? (React.createElement("img", { src: NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(image) === 'image' ? (React.createElement("img", { src: image || NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(image) === 'video' ? (React.createElement("video", { controls: true, style: { width: '100%' } },
                    React.createElement("source", { src: image, type: "video/mp4" }),
                    "Your browser does not support the video tag.")) : null)) : null,
                React.createElement("div", { className: "checkbox-container atom_radio" },
                    React.createElement("input", Object.assign({ id: inputId, onChange: this.onChange, onClick: this.onClick, type: "radio", checked: e.type === selected, value: e.type, "aria-label": e.ariaLabel, disabled: e.disabled ? e.disabled : false, required: i === 0 && isRequired, className: `atom_radio__input ${inputClasses}` }, ariaInvalid)),
                    React.createElement("label", { htmlFor: inputId, className: `atom_radio__label ${labelClasses}` },
                        React.createElement("span", { tabIndex: -1, className: `atom_radio__checkicon ${checkiconClasses}` },
                            React.createElement("span", { tabIndex: -1, className: `atom_radio__checkicon_innercicrcle` })),
                        React.createElement("span", { className: `atom_radio__text ${textClasses}` }, label),
                        e.content),
                    e.hjelpetrigger)));
        });
        const content = (React.createElement(React.Fragment, null,
            React.createElement(PrivateRadioGroup, { name: id, value: selected, classNameGroup: `${this.props.classNameGroup} group-container` },
                React.createElement(React.Fragment, null, inputFields)),
            children));
        return (React.createElement("div", { className: `mol_validation ${!valid ? 'mol_validation--active' : ''} ${wrapperClassName ? wrapperClassName : ''}`, id: `${id}-wrapper`, "data-testid": testId },
            this.renderErrorMessage(),
            !noFieldset ? (React.createElement("fieldset", { className: fieldsetClassName ? fieldsetClassName : '' },
                this.renderLegend(),
                this.renderHelp(),
                this.renderImage(),
                content)) : (React.createElement("div", { "aria-labelledby": ariaLabelledBy, role: "radiogroup" }, content))));
    }
}
RadioGroup.hnFormComponent = true;
export { RadioGroup };
//# sourceMappingURL=index.js.map