import * as React from 'react';
import classNames from 'classnames';
import Loader from '@helsenorge/designsystem-react/components/Loader';
import FormCancelButton from './form-buttons/form-cancel-button';
import FormDraftButton from './form-buttons/form-draft-button';
import FormPauseButton from './form-buttons/form-pause-button';
import FormSubmitButton from './form-buttons/form-submit-button';
import ValidationError from './validation-error';
import ValidationSummary from './validation-summary';
import { ValidationSummaryPlacement } from './validationSummaryPlacement';
import toolkitstyles from './styles.module.scss';
import './styles.scss';
export var ButtonType;
(function (ButtonType) {
    ButtonType["submitButton"] = "submitButton";
    ButtonType["draftButton"] = "draftButton";
    ButtonType["cancelButton"] = "cancelButton";
    ButtonType["pauseButton"] = "pauseButton";
})(ButtonType || (ButtonType = {}));
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.areAllFieldsValid = () => {
            for (const child of this.state.formComponents) {
                const childToValidate = child && child.getWrappedInstance ? child.getWrappedInstance() : child;
                const childToValidateIsValid = childToValidate && childToValidate.isValid && !childToValidate.isValid() ? true : false;
                const childToValidatePropsIsValid = childToValidate && childToValidate.props && childToValidate.props.isValid && !childToValidate.props.isValid() ? true : false;
                if (childToValidateIsValid || childToValidatePropsIsValid) {
                    this.props.onFieldsNotCorrectlyFilledOut && this.props.onFieldsNotCorrectlyFilledOut();
                    return false;
                }
            }
            return true;
        };
        this.onFormSubmit = (cb) => {
            this.setState({ submitted: true }, () => {
                this.validateForm(() => {
                    if (this.areAllFieldsValid()) {
                        cb();
                    }
                    else {
                        this.setState({ valid: false });
                        if (this.props.validationSummary && this.props.validationSummary.enable && this.validationSummaryRef.current) {
                            this.validationSummaryRef.current.scrollIntoView();
                            this.validationSummaryRef.current.focus();
                        }
                    }
                });
            });
        };
        this.onChildValidated = () => {
            // a field has changed status to valid, revalidate form
            if (this.state.submitted) {
                this.setState({
                    valid: this.areAllFieldsValid(),
                });
            }
        };
        this.isSubmitted = () => {
            return this.state.submitted;
        };
        this.renderLoader = () => {
            if (this.props.disabled) {
                return React.createElement(Loader, { size: 'medium', overlay: 'parent' });
            }
        };
        this.addFormComponent = (comp) => {
            this.setState(({ formComponents }) => {
                formComponents.push(comp);
                return { formComponents };
            });
        };
        this.removeFormComponent = (comp) => {
            this.setState(({ formComponents }) => {
                const index = formComponents.indexOf(comp);
                formComponents.splice(index, 1);
                return { formComponents };
            }, () => {
                // Invalid field removed. Revalidate form
                if (!this.state.valid && comp.isValid && !comp.isValid()) {
                    this.onChildValidated();
                }
            });
        };
        this.renderValidationSummary = () => {
            if (this.props.validationSummary && this.props.validationSummary.enable) {
                return (React.createElement("div", { className: "mol_validation-summary_wrapper", ref: this.validationSummaryRef, tabIndex: -1, "aria-atomic": "true" },
                    React.createElement(ValidationSummary, { header: this.props.validationSummary.header, components: this.state.formComponents, submitted: this.state.submitted })));
            }
        };
        this.renderChildren = () => {
            const { children } = this.props;
            if (!children) {
                return null;
            }
            const childrenWithProp = React.Children.map(children, (child) => {
                if (child) {
                    // gets the props that are directly written on component to override automatic copies if allowChildPropOverride is true
                    const childPreviousProps = typeof child.type === 'function' && child.props && child.props.children && child.props.children.props
                        ? child.props.children.props
                        : undefined;
                    const childProps = {
                        addFormComponent: this.addFormComponent,
                        removeFormComponent: this.removeFormComponent,
                        onValidated: this.onChildValidated,
                        optionalLabel: this.props.allowChildPropOverride && childPreviousProps && childPreviousProps.optionalLabel
                            ? childPreviousProps.optionalLabel
                            : this.props.optionalLabel,
                        requiredLabel: this.props.allowChildPropOverride && childPreviousProps && childPreviousProps.requiredLabel
                            ? childPreviousProps.requiredLabel
                            : this.props.requiredLabel,
                        isSubmitted: this.isSubmitted,
                        showOptionalLabel: this.props.allowChildPropOverride && childPreviousProps && childPreviousProps.showOptionalLabel
                            ? childPreviousProps.showOptionalLabel
                            : this.props.showOptionalLabel
                                ? this.props.showOptionalLabel
                                : true,
                        showRequiredLabel: this.props.showRequiredLabel && childPreviousProps && childPreviousProps.showRequiredLabel
                            ? childPreviousProps.showRequiredLabel
                            : this.props.showRequiredLabel
                                ? this.props.showRequiredLabel
                                : false,
                    };
                    // clones and adds ValidationProps only if the child is a FunctionComponent or ClassComponent, not if a DOM component
                    return React.cloneElement(child, typeof child.type === 'function' || typeof child.type === 'object' ? childProps : {});
                }
            });
            return childrenWithProp;
        };
        this.state = {
            valid: true,
            submitted: false,
            formComponents: [],
        };
        this.validationSummaryRef = React.createRef();
    }
    validateForm(cb) {
        const promises = [];
        this.state.formComponents.forEach((child) => {
            const childToValidate = child && child.getWrappedInstance ? child.getWrappedInstance() : child;
            if (childToValidate && childToValidate.props && childToValidate.props.validateField) {
                promises.push(childToValidate.props.validateField());
            }
            else if (childToValidate && childToValidate.validateField) {
                const returnedPromise = childToValidate.validateField();
                promises.push(returnedPromise);
            }
        });
        if (this.props.submitValidator) {
            promises.push(this.props.submitValidator());
        }
        Promise.all(promises).then(cb);
    }
    renderErrorMessage() {
        let isValid = true;
        if (!this.state.valid && this.state.submitted) {
            isValid = false;
        }
        return (React.createElement(ValidationError, { isValid: isValid, error: this.props.errorMessage ? this.props.errorMessage : '', className: "mol_form__formerror", textClassName: "mol_validation__formerrortext", testId: this.props.validationTestId }));
    }
    renderButtons() {
        const submitButton = (React.createElement(FormSubmitButton, { submitButtonText: this.props.submitButtonText, submitButtonClasses: this.props.submitButtonClasses, submitButtonLeftIcon: this.props.submitButtonLeftIcon, submitButtonRightIcon: this.props.submitButtonRightIcon, submitButtonType: this.props.submitButtonType, submitButtonDisabled: this.props.submitButtonDisabled, onFormSubmit: this.onFormSubmit, onSubmit: this.props.onSubmit, submitButtonTestId: this.props.submitButtonTestId, key: "submit-button" }));
        const cancelButton = (React.createElement(FormCancelButton, { cancelButtonText: this.props.cancelButtonText, cancelButtonClasses: this.props.cancelButtonClasses, cancelButtonType: this.props.cancelButtonType, cancelButtonLeftIcon: this.props.cancelButtonLeftIcon, cancelButtonDisabled: this.props.cancelButtonDisabled, onCancel: this.props.onCancel, cancelButtonTestId: this.props.cancelButtonTestId, cancelButtonOutline: this.props.cancelButtonOutline, key: "cancel-button" }));
        const pauseButton = (React.createElement(FormPauseButton, { pauseButtonText: this.props.pauseButtonText, pauseButtonClasses: this.props.pauseButtonClasses, pauseButtonType: this.props.pauseButtonType, pauseButtonLevel: this.props.pauseButtonLevel, pauseButtonLeftIcon: this.props.pauseButtonLeftIcon, pauseButtonDisabled: this.props.pauseButtonDisabled, onPause: this.props.onPause, pauseButtonTestId: this.props.pauseButtonTestId, key: "pause-button" }));
        const draftButton = (React.createElement(FormDraftButton, { draftButtonText: this.props.draftButtonText, draftButtonClasses: this.props.draftButtonClasses, onFormSubmit: this.onFormSubmit, onDraft: this.props.onDraft, draftButtonTestId: this.props.draftButtonTestId, key: "draft-button" }));
        const buttonSpanClass = toolkitstyles['form__buttonwrapper__button-span'];
        if (!submitButton && !cancelButton && !pauseButton && !draftButton) {
            return null;
        }
        const buttonSelector = (buttonType) => {
            switch (buttonType) {
                case ButtonType.cancelButton:
                    return cancelButton;
                case ButtonType.draftButton:
                    return draftButton;
                case ButtonType.pauseButton:
                    return pauseButton;
                case ButtonType.submitButton:
                    return submitButton;
                default:
                    return submitButton;
            }
        };
        return (React.createElement("span", { className: buttonSpanClass }, this.props.buttonOrder && Object.values(this.props.buttonOrder).map(button => buttonSelector(button))));
    }
    render() {
        const formClasses = classNames('mol_form', this.props.className);
        const contentClasses = classNames('mol_form--content', this.props.contentClasses);
        const validationSummaryPlacement = this.props.validationSummaryPlacement || ValidationSummaryPlacement.Top;
        return (React.createElement("form", { method: "post", action: this.props.action, onSubmit: (e) => {
                if (this.props.triggerPreventDefaultOnSubmit) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.onFormSubmit(() => {
                    if (this.props.onSubmit) {
                        this.props.onSubmit(e);
                    }
                });
            }, className: formClasses },
            validationSummaryPlacement === ValidationSummaryPlacement.Top && this.renderValidationSummary(),
            React.createElement("div", { className: contentClasses }, this.renderChildren()),
            validationSummaryPlacement === ValidationSummaryPlacement.Bottom && this.renderValidationSummary(),
            React.createElement("div", { className: `${toolkitstyles.form__buttonwrapper} ${this.props.buttonClasses}` },
                this.renderErrorMessage(),
                this.renderButtons()),
            this.renderLoader()));
    }
}
Form.defaultProps = {
    action: '#',
    submitButtonType: 'action',
    cancelButtonType: 'action',
    pauseButtonType: 'action',
    pauseButtonLevel: 'tertiary',
    buttonOrder: { 1: ButtonType.submitButton, 2: ButtonType.draftButton, 3: ButtonType.cancelButton, 4: ButtonType.pauseButton },
};
export default Form;
//# sourceMappingURL=index.js.map